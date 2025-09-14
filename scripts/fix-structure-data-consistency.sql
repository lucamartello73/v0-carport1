-- Fix data inconsistencies in structure types
-- Update "Addossato Legno" to have correct structure_category
UPDATE carport_structure_types 
SET structure_category = 'addossato'
WHERE name = 'Addossato Legno' AND material_type = 'legno';

-- Ensure models are properly linked to structure types
-- Link models to structure types based on material and category matching
UPDATE carport_models 
SET structure_type_id = (
  SELECT st.id 
  FROM carport_structure_types st 
  WHERE st.material_type = 'legno' 
  AND st.structure_category = 'addossato'
  LIMIT 1
)
WHERE name ILIKE '%legno%' OR description ILIKE '%legno%';

UPDATE carport_models 
SET structure_type_id = (
  SELECT st.id 
  FROM carport_structure_types st 
  WHERE st.material_type = 'acciaio' 
  AND st.structure_category = 'autoportante'
  LIMIT 1
)
WHERE name ILIKE '%acciaio%' OR description ILIKE '%acciaio%' OR name ILIKE '%classico%';
