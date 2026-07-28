/*
# Fix RLS policies to restrict admin-only write access

## Issue
Previous policies used `USING (true)` for authenticated users, allowing ANY
authenticated user to insert/update/delete. This is a security flaw.

## Fix
Replace with explicit admin user ID check so only the portfolio owner can write.
Admin user ID: 0ff93354-9678-4450-8fc6-1236d27faebf
*/

-- Drop overly-permissive policies
DROP POLICY IF EXISTS "admin_insert_projects" ON projects;
DROP POLICY IF EXISTS "admin_update_projects" ON projects;
DROP POLICY IF EXISTS "admin_delete_projects" ON projects;
DROP POLICY IF EXISTS "admin_insert_certificates" ON certificates;
DROP POLICY IF EXISTS "admin_update_certificates" ON certificates;
DROP POLICY IF EXISTS "admin_delete_certificates" ON certificates;

-- Create restrictive policies for projects (admin user only)
CREATE POLICY "admin_insert_projects" ON projects FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = '0ff93354-9678-4450-8fc6-1236d27faebf'::uuid);

CREATE POLICY "admin_update_projects" ON projects FOR UPDATE
  TO authenticated USING (auth.uid() = '0ff93354-9678-4450-8fc6-1236d27faebf'::uuid)
  WITH CHECK (auth.uid() = '0ff93354-9678-4450-8fc6-1236d27faebf'::uuid);

CREATE POLICY "admin_delete_projects" ON projects FOR DELETE
  TO authenticated USING (auth.uid() = '0ff93354-9678-4450-8fc6-1236d27faebf'::uuid);

-- Create restrictive policies for certificates (admin user only)
CREATE POLICY "admin_insert_certificates" ON certificates FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = '0ff93354-9678-4450-8fc6-1236d27faebf'::uuid);

CREATE POLICY "admin_update_certificates" ON certificates FOR UPDATE
  TO authenticated USING (auth.uid() = '0ff93354-9678-4450-8fc6-1236d27faebf'::uuid)
  WITH CHECK (auth.uid() = '0ff93354-9678-4450-8fc6-1236d27faebf'::uuid);

CREATE POLICY "admin_delete_certificates" ON certificates FOR DELETE
  TO authenticated USING (auth.uid() = '0ff93354-9678-4450-8fc6-1236d27faebf'::uuid);

-- Verify RLS is enabled
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
