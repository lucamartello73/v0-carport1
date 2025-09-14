-- Add new columns to carport_colors table for the new color system
ALTER TABLE carport_colors 
ADD COLUMN IF NOT EXISTS color_category TEXT CHECK (color_category IN ('acciaio', 'impregnati_classici', 'impregnati_pastello')),
ADD COLUMN IF NOT EXISTS is_custom_choice BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create junction table for colors and structure types relationship
CREATE TABLE IF NOT EXISTS carport_color_structure_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    color_id UUID REFERENCES carport_colors(id) ON DELETE CASCADE,
    structure_type_id UUID REFERENCES carport_structure_types(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(color_id, structure_type_id)
);

-- Update existing colors to have proper categories
UPDATE carport_colors SET color_category = 'acciaio' WHERE category = 'structure';
UPDATE carport_colors SET color_category = 'acciaio' WHERE category = 'coverage';

-- Insert sample colors for each category
-- Acciaio colors (5 sample + 1 custom choice)
INSERT INTO carport_colors (name, hex_value, category, color_category, price_modifier, is_custom_choice, display_order) VALUES
('Bianco RAL 9016', '#F6F6F6', 'structure', 'acciaio', 0, FALSE, 1),
('Antracite RAL 7016', '#383E42', 'structure', 'acciaio', 150, FALSE, 2),
('Grigio RAL 7035', '#D7D7D7', 'structure', 'acciaio', 100, FALSE, 3),
('Verde RAL 6005', '#1F4037', 'structure', 'acciaio', 200, FALSE, 4),
('Marrone RAL 8017', '#45322E', 'structure', 'acciaio', 150, FALSE, 5),
('Scelta Preferenza Cliente (Scala RAL)', '#CCCCCC', 'structure', 'acciaio', 300, TRUE, 6)
ON CONFLICT (name) DO UPDATE SET 
    color_category = EXCLUDED.color_category,
    is_custom_choice = EXCLUDED.is_custom_choice,
    display_order = EXCLUDED.display_order;

-- Impregnati classici colors (6 classic + 1 custom choice)
INSERT INTO carport_colors (name, hex_value, category, color_category, price_modifier, is_custom_choice, display_order) VALUES
('Mogano', '#C04000', 'structure', 'impregnati_classici', 250, FALSE, 1),
('Noce', '#8B4513', 'structure', 'impregnati_classici', 250, FALSE, 2),
('Frassino', '#D2B48C', 'structure', 'impregnati_classici', 200, FALSE, 3),
('Rovere', '#DEB887', 'structure', 'impregnati_classici', 200, FALSE, 4),
('Castagno', '#954535', 'structure', 'impregnati_classici', 220, FALSE, 5),
('Larice', '#CD853F', 'structure', 'impregnati_classici', 180, FALSE, 6),
('Colore a Scelta Cliente', '#D2691E', 'structure', 'impregnati_classici', 350, TRUE, 7)
ON CONFLICT (name) DO UPDATE SET 
    color_category = EXCLUDED.color_category,
    is_custom_choice = EXCLUDED.is_custom_choice,
    display_order = EXCLUDED.display_order;

-- Impregnati pastello colors (5 pastel + 1 custom choice)
INSERT INTO carport_colors (name, hex_value, category, color_category, price_modifier, is_custom_choice, display_order) VALUES
('Azzurro Pastello', '#B0E0E6', 'structure', 'impregnati_pastello', 300, FALSE, 1),
('Rosa Pastello', '#FFB6C1', 'structure', 'impregnati_pastello', 300, FALSE, 2),
('Verde Pastello', '#98FB98', 'structure', 'impregnati_pastello', 300, FALSE, 3),
('Giallo Pastello', '#FFFFE0', 'structure', 'impregnati_pastello', 280, FALSE, 4),
('Lilla Pastello', '#DDA0DD', 'structure', 'impregnati_pastello', 320, FALSE, 5),
('Scelta Preferenza Cliente Pastello', '#F0F8FF', 'structure', 'impregnati_pastello', 400, TRUE, 6)
ON CONFLICT (name) DO UPDATE SET 
    color_category = EXCLUDED.color_category,
    is_custom_choice = EXCLUDED.is_custom_choice,
    display_order = EXCLUDED.display_order;
