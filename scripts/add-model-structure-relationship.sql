-- Adding structure_type_id column to carport_models table to link models to structure types
ALTER TABLE carport_models 
ADD COLUMN structure_type_id uuid REFERENCES carport_structure_types(id);

-- Adding index for better query performance
CREATE INDEX idx_carport_models_structure_type_id ON carport_models(structure_type_id);

-- Update existing models to have a default structure type (you may need to adjust these UUIDs based on your data)
-- This is just an example - you should update with actual structure type IDs from your database
UPDATE carport_models 
SET structure_type_id = (SELECT id FROM carport_structure_types LIMIT 1)
WHERE structure_type_id IS NULL;
