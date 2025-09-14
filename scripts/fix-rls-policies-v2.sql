-- Disable RLS on carport_configurations table to allow admin dashboard to read all configurations
ALTER TABLE carport_configurations DISABLE ROW LEVEL SECURITY;

-- Also ensure the table has proper permissions for the anon role
GRANT SELECT ON carport_configurations TO anon;
GRANT SELECT ON carport_configurations TO authenticated;

-- Check if there are any existing policies that might be blocking access
DROP POLICY IF EXISTS "Enable read access for all users" ON carport_configurations;

-- Create a permissive policy for reading configurations (optional, since RLS is disabled)
-- CREATE POLICY "Enable read access for all users" ON carport_configurations FOR SELECT USING (true);
