-- Script per aggiungere colori specifici per ogni categoria
-- Categoria: impregnanti legno (noce, mogano, rovere, frassino, tanganika)
-- Categoria: impregnanti pastello (bianco, salvia, azzurro, blu, verde)
-- Categoria: smalti ral (aggiungere verde a quelli già presenti)

-- Prima eliminiamo eventuali colori duplicati per evitare conflitti
DELETE FROM carport_colors WHERE name IN (
  'Noce', 'Mogano', 'Rovere', 'Frassino', 'Tanganika',
  'Bianco Pastello', 'Salvia', 'Azzurro', 'Blu Pastello', 'Verde Pastello',
  'Verde RAL 6018', 'Scelta Cliente Legno', 'Scelta Cliente Pastello', 'Scelta Cliente RAL'
);

-- CATEGORIA: IMPREGNANTI LEGNO
INSERT INTO carport_colors (id, name, hex_value, category, price_modifier, created_at, updated_at) VALUES
(gen_random_uuid(), 'Noce', '#8B4513', 'impregnanti_legno', 80, NOW(), NOW()),
(gen_random_uuid(), 'Mogano', '#C04000', 'impregnanti_legno', 90, NOW(), NOW()),
(gen_random_uuid(), 'Rovere', '#DEB887', 'impregnanti_legno', 85, NOW(), NOW()),
(gen_random_uuid(), 'Frassino', '#F5DEB3', 'impregnanti_legno', 75, NOW(), NOW()),
(gen_random_uuid(), 'Tanganika', '#CD853F', 'impregnanti_legno', 95, NOW(), NOW()),
(gen_random_uuid(), 'Scelta Cliente Legno', '#CCCCCC', 'impregnanti_legno', 0, NOW(), NOW());

-- CATEGORIA: IMPREGNANTI PASTELLO
INSERT INTO carport_colors (id, name, hex_value, category, price_modifier, created_at, updated_at) VALUES
(gen_random_uuid(), 'Bianco Pastello', '#F8F8FF', 'impregnanti_pastello', 50, NOW(), NOW()),
(gen_random_uuid(), 'Salvia', '#9CAF88', 'impregnanti_pastello', 60, NOW(), NOW()),
(gen_random_uuid(), 'Azzurro', '#87CEEB', 'impregnanti_pastello', 65, NOW(), NOW()),
(gen_random_uuid(), 'Blu Pastello', '#B0C4DE', 'impregnanti_pastello', 70, NOW(), NOW()),
(gen_random_uuid(), 'Verde Pastello', '#98FB98', 'impregnanti_pastello', 65, NOW(), NOW()),
(gen_random_uuid(), 'Scelta Cliente Pastello', '#CCCCCC', 'impregnanti_pastello', 0, NOW(), NOW());

-- CATEGORIA: SMALTI RAL (aggiungere verde a quelli già presenti)
INSERT INTO carport_colors (id, name, hex_value, category, price_modifier, created_at, updated_at) VALUES
(gen_random_uuid(), 'Verde RAL 6018', '#57A639', 'smalti_ral', 120, NOW(), NOW()),
(gen_random_uuid(), 'Scelta Cliente RAL', '#CCCCCC', 'smalti_ral', 0, NOW(), NOW());

-- Aggiorniamo anche i colori esistenti per assegnarli alle categorie corrette
UPDATE carport_colors SET category = 'smalti_ral' WHERE category = 'structure' AND name LIKE '%RAL%';
UPDATE carport_colors SET category = 'smalti_ral' WHERE category = 'coverage' AND name LIKE '%RAL%';
