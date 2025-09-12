-- Add image field to configurations table
ALTER TABLE configuratorelegno_configurations 
ADD COLUMN IF NOT EXISTS admin_image TEXT;

-- Add comment to explain the field
COMMENT ON COLUMN configuratorelegno_configurations.admin_image IS 'Image uploaded by admin for this configuration';
