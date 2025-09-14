-- Create junction table for coverage types and structure types relationship
CREATE TABLE IF NOT EXISTS carport_coverage_structure_types (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  coverage_type_id UUID NOT NULL REFERENCES carport_coverage_types(id) ON DELETE CASCADE,
  structure_type_id UUID NOT NULL REFERENCES carport_structure_types(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(coverage_type_id, structure_type_id)
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_coverage_structure_coverage_id ON carport_coverage_structure_types(coverage_type_id);
CREATE INDEX IF NOT EXISTS idx_coverage_structure_structure_id ON carport_coverage_structure_types(structure_type_id);

-- Add some initial relationships (example data)
-- You can modify these based on your actual coverage and structure types
INSERT INTO carport_coverage_structure_types (coverage_type_id, structure_type_id)
SELECT ct.id, st.id 
FROM carport_coverage_types ct, carport_structure_types st
WHERE NOT EXISTS (
  SELECT 1 FROM carport_coverage_structure_types cst 
  WHERE cst.coverage_type_id = ct.id AND cst.structure_type_id = st.id
)
ON CONFLICT (coverage_type_id, structure_type_id) DO NOTHING;
