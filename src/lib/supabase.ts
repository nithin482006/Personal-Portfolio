import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  period: string;
  github_url: string | null;
  live_url: string | null;
  impact: string;
  accent: string;
  sort_order: number;
  created_at: string;
  source: string | null;
  github_repo_id: string | null;
  last_synced: string | null;
};

export type Certificate = {
  id: string;
  name: string;
  org: string;
  period: string;
  sort_order: number;
  created_at: string;
};

export type GitHubRepo = {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  languages: Record<string, number>;
  topics: string[];
  stars: number;
  forks: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string | null;
  last_synced: string;
};
