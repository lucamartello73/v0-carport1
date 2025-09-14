-- Add contact_preference field to carport_configurations table
ALTER TABLE carport_configurations 
ADD COLUMN contact_preference TEXT DEFAULT 'email';

-- Update existing records to have a default value
UPDATE carport_configurations 
SET contact_preference = 'email' 
WHERE contact_preference IS NULL;
