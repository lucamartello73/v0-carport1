-- Add contact_preference field to carport_configurations table
-- This script adds the missing contact_preference column that is required for the contact preference feature

ALTER TABLE carport_configurations 
ADD COLUMN IF NOT EXISTS contact_preference TEXT DEFAULT 'email';

-- Update existing records to have a default value
UPDATE carport_configurations 
SET contact_preference = 'email' 
WHERE contact_preference IS NULL;

-- Add a comment to document the column
COMMENT ON COLUMN carport_configurations.contact_preference IS 'Customer preferred contact method: email, whatsapp, or telefono';
