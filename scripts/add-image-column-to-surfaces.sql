-- Add image column to carport_surfaces table
ALTER TABLE carport_surfaces 
ADD COLUMN image TEXT;

-- Add comment to explain the column
COMMENT ON COLUMN carport_surfaces.image IS 'URL or path to the surface image';
