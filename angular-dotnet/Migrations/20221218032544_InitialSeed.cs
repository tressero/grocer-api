using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace angular_dotnet.Migrations
{
    public partial class InitialSeed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Ingredient",
                columns: new[] { "Id", "Description", "Name", "StoreSectionId", "Unit" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), "", "Canned Corn", new Guid("00000000-0000-0000-0000-000000000000"), "Medium Can" },
                    { new Guid("00000000-0000-0000-0000-000000000002"), "Carrots, Potatoes, Green Beans, Onions version", "Canned Veg All", new Guid("00000000-0000-0000-0000-000000000000"), "Large Can" },
                    { new Guid("00000000-0000-0000-0000-000000000003"), "16 ounces", "Canned Diced Potatoes", new Guid("00000000-0000-0000-0000-000000000000"), "Medium Can" },
                    { new Guid("00000000-0000-0000-0000-000000000004"), "", "Ground Turkey", new Guid("00000000-0000-0000-0000-000000000000"), "Pound" },
                    { new Guid("00000000-0000-0000-0000-000000000005"), "16 ounces", "Enchilada Sauce", new Guid("00000000-0000-0000-0000-000000000000"), "Medium Can" }
                });

            migrationBuilder.InsertData(
                table: "Recipe",
                columns: new[] { "Id", "Name", "Url" },
                values: new object[] { new Guid("00000000-0000-0000-0000-000000000001"), "Vegetable Soup", "https://ochsners.us" });

            migrationBuilder.InsertData(
                table: "StoreSection",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), "Produce" },
                    { new Guid("00000000-0000-0000-0000-000000000002"), "Meat" },
                    { new Guid("00000000-0000-0000-0000-000000000003"), "Dairy" },
                    { new Guid("00000000-0000-0000-0000-000000000004"), "Frozen" },
                    { new Guid("00000000-0000-0000-0000-000000000005"), "Canned" },
                    { new Guid("00000000-0000-0000-0000-000000000006"), "Breakfast" }
                });

            migrationBuilder.InsertData(
                table: "RecipeIngredientJunction",
                columns: new[] { "IngredientId", "RecipeId", "IngredientCount" },
                values: new object[,]
                {
                    { new Guid("00000000-0000-0000-0000-000000000001"), new Guid("00000000-0000-0000-0000-000000000001"), 1 },
                    { new Guid("00000000-0000-0000-0000-000000000002"), new Guid("00000000-0000-0000-0000-000000000001"), 1 },
                    { new Guid("00000000-0000-0000-0000-000000000003"), new Guid("00000000-0000-0000-0000-000000000001"), 1 },
                    { new Guid("00000000-0000-0000-0000-000000000004"), new Guid("00000000-0000-0000-0000-000000000001"), 2 },
                    { new Guid("00000000-0000-0000-0000-000000000005"), new Guid("00000000-0000-0000-0000-000000000001"), 3 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "RecipeIngredientJunction",
                keyColumns: new[] { "IngredientId", "RecipeId" },
                keyValues: new object[] { new Guid("00000000-0000-0000-0000-000000000001"), new Guid("00000000-0000-0000-0000-000000000001") });

            migrationBuilder.DeleteData(
                table: "RecipeIngredientJunction",
                keyColumns: new[] { "IngredientId", "RecipeId" },
                keyValues: new object[] { new Guid("00000000-0000-0000-0000-000000000002"), new Guid("00000000-0000-0000-0000-000000000001") });

            migrationBuilder.DeleteData(
                table: "RecipeIngredientJunction",
                keyColumns: new[] { "IngredientId", "RecipeId" },
                keyValues: new object[] { new Guid("00000000-0000-0000-0000-000000000003"), new Guid("00000000-0000-0000-0000-000000000001") });

            migrationBuilder.DeleteData(
                table: "RecipeIngredientJunction",
                keyColumns: new[] { "IngredientId", "RecipeId" },
                keyValues: new object[] { new Guid("00000000-0000-0000-0000-000000000004"), new Guid("00000000-0000-0000-0000-000000000001") });

            migrationBuilder.DeleteData(
                table: "RecipeIngredientJunction",
                keyColumns: new[] { "IngredientId", "RecipeId" },
                keyValues: new object[] { new Guid("00000000-0000-0000-0000-000000000005"), new Guid("00000000-0000-0000-0000-000000000001") });

            migrationBuilder.DeleteData(
                table: "StoreSection",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "StoreSection",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "StoreSection",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "StoreSection",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "StoreSection",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "StoreSection",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000006"));

            migrationBuilder.DeleteData(
                table: "Ingredient",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"));

            migrationBuilder.DeleteData(
                table: "Ingredient",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000002"));

            migrationBuilder.DeleteData(
                table: "Ingredient",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000003"));

            migrationBuilder.DeleteData(
                table: "Ingredient",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000004"));

            migrationBuilder.DeleteData(
                table: "Ingredient",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000005"));

            migrationBuilder.DeleteData(
                table: "Recipe",
                keyColumn: "Id",
                keyValue: new Guid("00000000-0000-0000-0000-000000000001"));
        }
    }
}
