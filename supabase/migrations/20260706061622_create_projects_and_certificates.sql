/*
# Create projects and certificates tables

## Purpose
Allows the portfolio owner (Nithin) to add, edit, and delete projects and
certificates through an admin interface. Public visitors can read all entries.
Only authenticated users (the portfolio owner) can write.

## New Tables

### projects
Stores dynamic portfolio project entries added via the admin panel.
- id          – UUID primary key
- title       – Project name (required)
- description – Detailed description
- tags        – Array of technology tags (e.g. ["React", "Node.js"])
- period      – Date range string (e.g. "Jan 2025 – Mar 2025")
- github_url  – Optional GitHub repository link
- live_url    – Optional live demo link
- impact      – One-line impact/outcome statement
- accent      – Tailwind gradient string for card styling
- sort_order  – Controls display order (lower = first)
- created_at  – Auto-set on insert

### certificates
Stores dynamic course/certification entries added via the admin panel.
- id         – UUID primary key
- name       – Certificate/course name (required)
- org        – Issuing organization
- period     – Completion period string
- sort_order – Controls display order
- created_at – Auto-set on insert

## Security (RLS)
Both tables:
- SELECT: open to anon + authenticated (public portfolio, anyone can view)
- INSERT / UPDATE / DELETE: authenticated only (only logged-in admin can write)
*/

CREATE TABLE IF NOT EXISTS projects (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  description text NOT NULL DEFAULT '',
  tags        text[] NOT NULL DEFAULT '{}',
  period      text NOT NULL DEFAULT '',
  github_url  text,
  live_url    text,
  impact      text NOT NULL DEFAULT '',
  accent      text NOT NULL DEFAULT 'from-navy-800 to-navy-600',
  sort_order  int NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_projects" ON projects;
CREATE POLICY "public_select_projects" ON projects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_projects" ON projects;
CREATE POLICY "admin_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_projects" ON projects;
CREATE POLICY "admin_update_projects" ON projects FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_projects" ON projects;
CREATE POLICY "admin_delete_projects" ON projects FOR DELETE
  TO authenticated USING (true);

-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS certificates (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL,
  org        text NOT NULL DEFAULT '',
  period     text NOT NULL DEFAULT '',
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_certificates" ON certificates;
CREATE POLICY "public_select_certificates" ON certificates FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_insert_certificates" ON certificates;
CREATE POLICY "admin_insert_certificates" ON certificates FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_certificates" ON certificates;
CREATE POLICY "admin_update_certificates" ON certificates FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_certificates" ON certificates;
CREATE POLICY "admin_delete_certificates" ON certificates FOR DELETE
  TO authenticated USING (true);
