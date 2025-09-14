-- Populate color macrocategories with predefined colors
-- Each macrocategory has 5 colors + 1 custom choice option

-- Clear existing colors to start fresh
DELETE FROM carport_colors;

-- COLORI RAL 5+1 (for structure colors)
INSERT INTO carport_colors (name, hex_value, category, price_modifier, macro_category, is_custom_choice, display_order) VALUES
('Bianco RAL 9016', '#F6F6F6', 'structure', 0, 'COLORI_RAL', false, 1),
('Antracite RAL 7016', '#383E42', 'structure', 150, 'COLORI_RAL', false, 2),
('Grigio RAL 7035', '#D7D7D7', 'structure', 100, 'COLORI_RAL', false, 3),
('Verde RAL 6005', '#1F3A3D', 'structure', 200, 'COLORI_RAL', false, 4),
('Marrone RAL 8017', '#45322E', 'structure', 180, 'COLORI_RAL', false, 5),
('Scelta Cliente RAL', '#CCCCCC', 'structure', 300, 'COLORI_RAL', true, 6);

-- IMPREGNANTI LEGNO 5+1 (for wood treatments)
INSERT INTO carport_colors (name, hex_value, category, price_modifier, macro_category, is_custom_choice, display_order) VALUES
('Naturale', '#D2B48C', 'structure', 0, 'IMPREGNANTI_LEGNO', false, 1),
('Noce', '#8B4513', 'structure', 120, 'IMPREGNANTI_LEGNO', false, 2),
('Teak', '#B8860B', 'structure', 150, 'IMPREGNANTI_LEGNO', false, 3),
('Mogano', '#C04000', 'structure', 180, 'IMPREGNANTI_LEGNO', false, 4),
('Wengé', '#645452', 'structure', 200, 'IMPREGNANTI_LEGNO', false, 5),
('Scelta Cliente Legno', '#DEB887', 'structure', 250, 'IMPREGNANTI_LEGNO', true, 6);

-- IMPREGNANTI PASTELLO 5+1 (for pastel treatments)
INSERT INTO carport_colors (name, hex_value, category, price_modifier, macro_category, is_custom_choice, display_order) VALUES
('Azzurro Pastello', '#B0E0E6', 'structure', 100, 'IMPREGNANTI_PASTELLO', false, 1),
('Verde Pastello', '#98FB98', 'structure', 100, 'IMPREGNANTI_PASTELLO', false, 2),
('Rosa Pastello', '#FFB6C1', 'structure', 120, 'IMPREGNANTI_PASTELLO', false, 3),
('Giallo Pastello', '#FFFFE0', 'structure', 100, 'IMPREGNANTI_PASTELLO', false, 4),
('Lilla Pastello', '#DDA0DD', 'structure', 120, 'IMPREGNANTI_PASTELLO', false, 5),
('Scelta Cliente Pastello', '#F0F8FF', 'structure', 200, 'IMPREGNANTI_PASTELLO', true, 6);
