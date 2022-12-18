CREATE TABLE IF NOT EXISTS "__EFMigrationsHistory" (
    "MigrationId" character varying(150) NOT NULL,
    "ProductVersion" character varying(32) NOT NULL,
    CONSTRAINT "PK___EFMigrationsHistory" PRIMARY KEY ("MigrationId")
);

START TRANSACTION;

CREATE TABLE "Recipe" (
    "Id" uuid NOT NULL,
    "Name" text NOT NULL,
    "Url" text NOT NULL,
    CONSTRAINT "PK_Recipe" PRIMARY KEY ("Id")
);

CREATE TABLE "StoreSection" (
    "Id" uuid NOT NULL,
    "Name" text NOT NULL,
    CONSTRAINT "PK_StoreSection" PRIMARY KEY ("Id")
);

CREATE TABLE "Ingredient" (
    "Id" uuid NOT NULL,
    "Name" text NOT NULL,
    "Description" text NOT NULL,
    "Unit" text NOT NULL,
    "StoreSectionId" uuid NOT NULL,
    CONSTRAINT "PK_Ingredient" PRIMARY KEY ("Id"),
    CONSTRAINT "FK_Ingredient_StoreSection_StoreSectionId" FOREIGN KEY ("StoreSectionId") REFERENCES "StoreSection" ("Id") ON DELETE CASCADE
);

CREATE TABLE "RecipeIngredientJunction" (
    "IngredientId" uuid NOT NULL,
    "RecipeId" uuid NOT NULL,
    "IngredientCount" integer NOT NULL,
    CONSTRAINT "PK_RecipeIngredientJunction" PRIMARY KEY ("IngredientId", "RecipeId"),
    CONSTRAINT "FK_RecipeIngredientJunction_IngredientId" FOREIGN KEY ("IngredientId") REFERENCES "Ingredient" ("Id"),
    CONSTRAINT "FK_RecipeIngredientJunction_Recipe_RecipeId" FOREIGN KEY ("RecipeId") REFERENCES "Recipe" ("Id") ON DELETE CASCADE
);

CREATE INDEX "IX_Ingredient_StoreSectionId" ON "Ingredient" ("StoreSectionId");

CREATE INDEX "IX_RecipeIngredientJunction_RecipeId" ON "RecipeIngredientJunction" ("RecipeId");

INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20221218032428_InitialCreate', '6.0.12');

COMMIT;

