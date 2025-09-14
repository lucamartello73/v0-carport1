-- Make structure_category column optional in carport_structure_types table
ALTER TABLE carport_structure_types 
ALTER COLUMN structure_category DROP NOT NULL;

-- Add comment to document the change
COMMENT ON COLUMN carport_structure_types.structure_category IS 'Optional structure category field - can be null';
