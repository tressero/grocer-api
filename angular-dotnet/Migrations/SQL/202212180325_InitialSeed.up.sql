START TRANSACTION;

INSERT INTO "Ingredient" ("Id", "Description", "Name", "StoreSectionId", "Unit")
VALUES ('00000000-0000-0000-0000-000000000001', '', 'Canned Corn', '00000000-0000-0000-0000-000000000000', 'Medium Can');
INSERT INTO "Ingredient" ("Id", "Description", "Name", "StoreSectionId", "Unit")
VALUES ('00000000-0000-0000-0000-000000000002', 'Carrots, Potatoes, Green Beans, Onions version', 'Canned Veg All', '00000000-0000-0000-0000-000000000000', 'Large Can');
INSERT INTO "Ingredient" ("Id", "Description", "Name", "StoreSectionId", "Unit")
VALUES ('00000000-0000-0000-0000-000000000003', '16 ounces', 'Canned Diced Potatoes', '00000000-0000-0000-0000-000000000000', 'Medium Can');
INSERT INTO "Ingredient" ("Id", "Description", "Name", "StoreSectionId", "Unit")
VALUES ('00000000-0000-0000-0000-000000000004', '', 'Ground Turkey', '00000000-0000-0000-0000-000000000000', 'Pound');
INSERT INTO "Ingredient" ("Id", "Description", "Name", "StoreSectionId", "Unit")
VALUES ('00000000-0000-0000-0000-000000000005', '16 ounces', 'Enchilada Sauce', '00000000-0000-0000-0000-000000000000', 'Medium Can');

INSERT INTO "Recipe" ("Id", "Name", "Url")
VALUES ('00000000-0000-0000-0000-000000000001', 'Vegetable Soup', 'https://ochsners.us');

INSERT INTO "StoreSection" ("Id", "Name")
VALUES ('00000000-0000-0000-0000-000000000000', 'N/A');
INSERT INTO "StoreSection" ("Id", "Name")
VALUES ('00000000-0000-0000-0000-000000000001', 'Produce');
INSERT INTO "StoreSection" ("Id", "Name")
VALUES ('00000000-0000-0000-0000-000000000002', 'Meat');
INSERT INTO "StoreSection" ("Id", "Name")
VALUES ('00000000-0000-0000-0000-000000000003', 'Dairy');
INSERT INTO "StoreSection" ("Id", "Name")
VALUES ('00000000-0000-0000-0000-000000000004', 'Frozen');
INSERT INTO "StoreSection" ("Id", "Name")
VALUES ('00000000-0000-0000-0000-000000000005', 'Canned');
INSERT INTO "StoreSection" ("Id", "Name")
VALUES ('00000000-0000-0000-0000-000000000006', 'Breakfast');

INSERT INTO "RecipeIngredientJunction" ("IngredientId", "RecipeId", "IngredientCount")
VALUES ('00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000001', 1);
INSERT INTO "RecipeIngredientJunction" ("IngredientId", "RecipeId", "IngredientCount")
VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 1);
INSERT INTO "RecipeIngredientJunction" ("IngredientId", "RecipeId", "IngredientCount")
VALUES ('00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000001', 1);
INSERT INTO "RecipeIngredientJunction" ("IngredientId", "RecipeId", "IngredientCount")
VALUES ('00000000-0000-0000-0000-000000000004', '00000000-0000-0000-0000-000000000001', 2);
INSERT INTO "RecipeIngredientJunction" ("IngredientId", "RecipeId", "IngredientCount")
VALUES ('00000000-0000-0000-0000-000000000005', '00000000-0000-0000-0000-000000000001', 3);

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20221218032544_InitialSeed', '6.0.12');

COMMIT;

