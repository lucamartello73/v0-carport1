-- Add model_id column to structure types table
ALTER TABLE carport_structure_types 
ADD COLUMN IF NOT EXISTS model_id UUID REFERENCES carport_models(id);

-- Remove the old check constraints if they exist
ALTER TABLE carport_structure_types 
DROP CONSTRAINT IF EXISTS carport_structure_types_structure_category_check;

ALTER TABLE carport_structure_types 
DROP CONSTRAINT IF EXISTS carport_structure_types_material_type_check;

-- Update existing structure types to link them to appropriate models
-- First, let's see what models we have and link them appropriately
UPDATE carport_structure_types 
SET model_id = (
  SELECT id FROM carport_models 
  WHERE LOWER(name) LIKE '%' || LOWER(carport_structure_types.name) || '%'
  OR LOWER(description) LIKE '%' || LOWER(carport_structure_types.name) || '%'
  LIMIT 1
)
WHERE model_id IS NULL;

-- If no automatic match found, link to first available model
UPDATE carport_structure_types 
SET model_id = (SELECT id FROM carport_models LIMIT 1)
WHERE model_id IS NULL;
