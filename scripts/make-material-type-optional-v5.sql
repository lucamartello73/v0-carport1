-- Make material_type column nullable in carport_structure_types table
ALTER TABLE carport_structure_types 
ALTER COLUMN material_type DROP NOT NULL;

-- Update existing records to have null material_type if needed
UPDATE carport_structure_types 
SET material_type = NULL 
WHERE material_type IS NOT NULL;
