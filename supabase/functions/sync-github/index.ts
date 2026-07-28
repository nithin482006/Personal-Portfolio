import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const GITHUB_USERNAME = "nithin482006";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

interface GitHubRepo {
  full_name: string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages_url: string;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

function formatPeriod(pushedAt: string): string {
  const d = new Date(pushedAt);
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function buildImpact(repo: GitHubRepo): string {
  const parts: string[] = [];
  if (repo.language) parts.push(`${repo.language} project`);
  if (repo.stars > 0) parts.push(`${repo.stars} star${repo.stars === 1 ? "" : "s"}`);
  if (repo.forks > 0) parts.push(`${repo.forks} fork${repo.forks === 1 ? "" : "s"}`);
  if (repo.topics.length > 0) parts.push(`${repo.topics.length} topics`);
  return parts.length ? `GitHub: ${parts.join(" • ")}` : "Synced from GitHub";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const url = new URL(req.url);
    const force = url.searchParams.get("force") === "true";

    if (!force) {
      const { data: recent } = await supabase
        .from("github_repos")
        .select("last_synced")
        .order("last_synced", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (recent?.last_synced) {
        const age = Date.now() - new Date(recent.last_synced).getTime();
        if (age < SEVEN_DAYS_MS) {
          return new Response(
            JSON.stringify({ message: "Recently synced — skipping", last_synced: recent.last_synced }),
            { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
      }
    }

    const githubHeaders: Record<string, string> = {
      "User-Agent": "nithin-portfolio-sync/1.0",
      "Accept": "application/vnd.github+json",
    };
    const token = Deno.env.get("GITHUB_TOKEN");
    if (token) githubHeaders["Authorization"] = `Bearer ${token}`;

    const repos: GitHubRepo[] = [];
    let page = 1;
    while (true) {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public&sort=pushed&page=${page}`,
        { headers: githubHeaders },
      );
      if (!res.ok) {
        const body = await res.text();
        throw new Error(`GitHub API error ${res.status}: ${body}`);
      }
      const batch: GitHubRepo[] = await res.json();
      repos.push(...batch);
      if (batch.length < 100) break;
      page++;
    }

    const rows = [];
    const now = new Date().toISOString();

    for (const repo of repos) {
      let languages: Record<string, number> = {};
      try {
        const langRes = await fetch(repo.languages_url, { headers: githubHeaders });
        if (langRes.ok) languages = await langRes.json();
      } catch {
        // best-effort
      }

      rows.push({
        id: repo.full_name,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage?.trim() || null,
        language: repo.language,
        languages,
        topics: repo.topics ?? [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        fork: repo.fork,
        archived: repo.archived,
        pushed_at: repo.pushed_at,
        last_synced: now,
      });
    }

    if (rows.length === 0) {
      return new Response(
        JSON.stringify({ message: "No public repositories found", synced: 0 }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { error: repoError } = await supabase
      .from("github_repos")
      .upsert(rows, { onConflict: "id" });

    if (repoError) throw new Error(`Supabase upsert error (github_repos): ${repoError.message}`);

    // ── Sync into projects table for resume + projects section ──
    const projectRows = repos.map((repo, idx) => {
      const langKeys = repo.language ? [repo.language] : [];
      const topicTags = repo.topics?.slice(0, 4) ?? [];
      const tags = Array.from(new Set([...langKeys, ...topicTags])).slice(0, 6);

      return {
        title: repo.name,
        description: repo.description || `${repo.name} — repository on GitHub`,
        tags,
        period: formatPeriod(repo.pushed_at),
        github_url: repo.html_url,
        live_url: repo.homepage?.trim() || null,
        impact: buildImpact(repo),
        accent: "neon-cyan",
        sort_order: 1000 + idx,
        source: "github",
        github_repo_id: repo.full_name,
        last_synced: now,
      };
    });

    const { error: projError } = await supabase
      .from("projects")
      .upsert(projectRows, { onConflict: "github_repo_id" });

    if (projError) throw new Error(`Supabase upsert error (projects): ${projError.message}`);

    // Remove stale synced projects (repos that no longer exist publicly)
    const syncedIds = repos.map((r) => r.full_name);
    const { data: existingSynced } = await supabase
      .from("projects")
      .select("id, github_repo_id")
      .eq("source", "github");

    if (existingSynced) {
      const stale = existingSynced.filter((p) => p.github_repo_id && !syncedIds.includes(p.github_repo_id));
      if (stale.length > 0) {
        await supabase.from("projects").delete().in("id", stale.map((p) => p.id));
      }
    }

    return new Response(
      JSON.stringify({
        message: "Sync complete",
        synced: rows.length,
        projects_synced: projectRows.length,
        timestamp: now,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
