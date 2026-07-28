/*
# Add source tracking columns to projects table

## Purpose
Allows the GitHub sync edge function to automatically create and update
project entries from synced repositories. Previously, projects were either
hardcoded (in portfolio.ts) or manually added via the admin panel. Now the
sync-github edge function can upsert rows into the projects table so that
the Resume Generator and Projects section always reflect the latest GitHub
repositories.

## Changes to existing table: projects
- source         – text, nullable. Tracks origin: 'github' for auto-synced,
                  NULL for manually created. Defaults to NULL so existing
                  rows are unaffected.
- github_repo_id – text, nullable. Foreign-key-like reference to
                  github_repos.id (repo full_name). Used to match synced
                  rows for upsert and to clean up stale entries.
- last_synced    – timestamptz, nullable. When the row was last refreshed
                  from GitHub (only set for source='github' rows).

## Security
No RLS policy changes. Existing policies remain:
- SELECT: public (anon + authenticated)
- INSERT/UPDATE/DELETE: authenticated only
The edge function writes via the service role key, which bypasses RLS.
A service-role insert is needed because the anon key cannot insert.

## Notes
1. Existing manually-created projects keep source=NULL and are never
   touched by the sync.
2. The edge function uses onConflict='github_repo_id' to upsert only
   its own rows, leaving manual projects untouched.
3. Stale synced projects (repos no longer public/existing) are deleted
   by the edge function on each sync.
*/

ALTER TABLE projects
  ADD COLUMN IF NOT EXISTS source text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS github_repo_id text DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS last_synced timestamptz DEFAULT NULL;

-- Unique constraint so upsert by github_repo_id works cleanly
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'projects_github_repo_id_key'
  ) THEN
    ALTER TABLE projects ADD CONSTRAINT projects_github_repo_id_key UNIQUE (github_repo_id);
  END IF;
END $$;
