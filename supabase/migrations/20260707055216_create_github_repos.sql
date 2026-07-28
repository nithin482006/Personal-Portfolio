/*
# Create github_repos table

## Purpose
Caches GitHub public repository data for the portfolio owner (nithin482006).
Synced weekly via a Supabase Edge Function. Public visitors can read all entries;
only the edge function (service role) can write.

## New Table: github_repos
- id           – text PK = repo.full_name (e.g. "nithin482006/my-repo")
- name         – Repository short name
- description  – Repository description (nullable)
- html_url     – GitHub URL
- homepage     – Live demo / deployment URL set by owner (nullable)
- language     – Primary language (nullable)
- languages    – JSONB map of { "Language": byte_count } for all languages
- topics       – Array of repository topic tags
- stars        – stargazers_count
- forks        – forks_count
- fork         – Whether this repo is a fork of another
- archived     – Whether the repo is archived
- pushed_at    – Timestamp of last push / commit
- last_synced  – When this row was last refreshed from GitHub

## Security (RLS)
- SELECT: open to anon + authenticated (public portfolio viewing)
- INSERT / UPDATE / DELETE: NOT granted to clients;
  writes come exclusively from the edge function via the service role key,
  which bypasses RLS entirely.
*/

CREATE TABLE IF NOT EXISTS github_repos (
  id          text PRIMARY KEY,
  name        text NOT NULL,
  description text,
  html_url    text NOT NULL,
  homepage    text,
  language    text,
  languages   jsonb NOT NULL DEFAULT '{}',
  topics      text[] NOT NULL DEFAULT '{}',
  stars       int NOT NULL DEFAULT 0,
  forks       int NOT NULL DEFAULT 0,
  fork        boolean NOT NULL DEFAULT false,
  archived    boolean NOT NULL DEFAULT false,
  pushed_at   timestamptz,
  last_synced timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE github_repos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_github_repos" ON github_repos;
CREATE POLICY "public_select_github_repos" ON github_repos
  FOR SELECT TO anon, authenticated USING (true);
