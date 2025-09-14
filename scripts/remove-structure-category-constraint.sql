-- Remove the check constraint on structure_category to allow dynamic values
ALTER TABLE carport_structure_types DROP CONSTRAINT IF EXISTS carport_structure_types_structure_category_check;

-- Add a more flexible constraint that allows any non-empty text
ALTER TABLE carport_structure_types ADD CONSTRAINT carport_structure_types_structure_category_check 
CHECK (structure_category IS NOT NULL AND length(trim(structure_category)) > 0);
