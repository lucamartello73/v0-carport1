-- Aggiorna la struttura per supportare le tre macrocategorie di colori
-- e il collegamento ai tipi di struttura

-- 1. Aggiorna la tabella carport_colors per supportare le macrocategorie
ALTER TABLE carport_colors 
ADD COLUMN IF NOT EXISTS macro_category TEXT CHECK (macro_category IN ('COLORI_RAL', 'IMPREGNANTI_LEGNO', 'IMPREGNANTI_PASTELLO')),
ADD COLUMN IF NOT EXISTS is_custom_choice BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- 2. Crea tabella di collegamento tra colori e tipi di struttura
CREATE TABLE IF NOT EXISTS carport_color_structure_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    color_id UUID REFERENCES carport_colors(id) ON DELETE CASCADE,
    structure_type_id UUID REFERENCES carport_structure_types(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(color_id, structure_type_id)
);

-- 3. Aggiorna i colori esistenti per assegnarli alle macrocategorie
-- (Questo è un esempio, dovrai adattarlo ai tuoi colori specifici)
UPDATE carport_colors SET 
    macro_category = 'COLORI_RAL',
    display_order = 1
WHERE category = 'structure' AND name IN ('Bianco', 'Nero', 'Grigio', 'Marrone', 'Verde');

-- 4. Inserisci colori di esempio per le tre macrocategorie se non esistono

-- COLORI RAL (5 + 1 scelta cliente)
INSERT INTO carport_colors (name, hex_value, category, macro_category, is_custom_choice, display_order, price_modifier)
VALUES 
    ('RAL 9010 Bianco', '#FFFFFF', 'structure', 'COLORI_RAL', FALSE, 1, 0),
    ('RAL 7016 Grigio Antracite', '#383E42', 'structure', 'COLORI_RAL', FALSE, 2, 50),
    ('RAL 8017 Marrone Cioccolato', '#45322E', 'structure', 'COLORI_RAL', FALSE, 3, 50),
    ('RAL 6005 Verde Muschio', '#2F4F4F', 'structure', 'COLORI_RAL', FALSE, 4, 50),
    ('RAL 3009 Rosso Ossido', '#642424', 'structure', 'COLORI_RAL', FALSE, 5, 50),
    ('Scelta Cliente RAL', '#CCCCCC', 'structure', 'COLORI_RAL', TRUE, 6, 100)
ON CONFLICT (name) DO NOTHING;

-- IMPREGNANTI LEGNO (5 + 1 scelta cliente)
INSERT INTO carport_colors (name, hex_value, category, macro_category, is_custom_choice, display_order, price_modifier)
VALUES 
    ('Mogano', '#C04000', 'structure', 'IMPREGNANTI_LEGNO', FALSE, 1, 75),
    ('Noce', '#8B4513', 'structure', 'IMPREGNANTI_LEGNO', FALSE, 2, 75),
    ('Frassino', '#D2B48C', 'structure', 'IMPREGNANTI_LEGNO', FALSE, 3, 75),
    ('Rovere', '#DEB887', 'structure', 'IMPREGNANTI_LEGNO', FALSE, 4, 75),
    ('Castagno', '#954535', 'structure', 'IMPREGNANTI_LEGNO', FALSE, 5, 75),
    ('Larice', '#CD853F', 'structure', 'IMPREGNANTI_LEGNO', FALSE, 6, 75),
    ('Colore Legno a Scelta', '#D2B48C', 'structure', 'IMPREGNANTI_LEGNO', TRUE, 7, 100)
ON CONFLICT (name) DO NOTHING;

-- IMPREGNANTI PASTELLO (5 + 1 scelta cliente)
INSERT INTO carport_colors (name, hex_value, category, macro_category, is_custom_choice, display_order, price_modifier)
VALUES 
    ('Azzurro Pastello', '#B0E0E6', 'structure', 'IMPREGNANTI_PASTELLO', FALSE, 1, 75),
    ('Rosa Pastello', '#FFB6C1', 'structure', 'IMPREGNANTI_PASTELLO', FALSE, 2, 75),
    ('Verde Pastello', '#98FB98', 'structure', 'IMPREGNANTI_PASTELLO', FALSE, 3, 75),
    ('Giallo Pastello', '#FFFFE0', 'structure', 'IMPREGNANTI_PASTELLO', FALSE, 4, 75),
    ('Lilla Pastello', '#DDA0DD', 'structure', 'IMPREGNANTI_PASTELLO', FALSE, 5, 75),
    ('Colore Pastello a Scelta', '#F0F8FF', 'structure', 'IMPREGNANTI_PASTELLO', TRUE, 6, 100)
ON CONFLICT (name) DO NOTHING;

-- 5. Crea indici per migliorare le performance
CREATE INDEX IF NOT EXISTS idx_carport_colors_macro_category ON carport_colors(macro_category);
CREATE INDEX IF NOT EXISTS idx_carport_colors_display_order ON carport_colors(display_order);
CREATE INDEX IF NOT EXISTS idx_carport_color_structure_links_color ON carport_color_structure_links(color_id);
CREATE INDEX IF NOT EXISTS idx_carport_color_structure_links_structure ON carport_color_structure_links(structure_type_id);
