using angular_dotnet.DbModels;
using Microsoft.EntityFrameworkCore;

namespace angular_dotnet.DbContext;

public class GrocerContext : Microsoft.EntityFrameworkCore.DbContext
{
    public GrocerContext(DbContextOptions options): base(options) {}
    
    public DbSet<Ingredient> Ingredient { get; set; }
    public DbSet<Recipe> Recipe { get; set; }
    public DbSet<RecipeIngredientJunction> RecipeIngredientJunction { get; set; }
    public DbSet<StoreSection> StoreSection { get; set; }
    
    
    private static string _username = "";
    private static string _password = "";
    private static string _server = "";
    private static string _database = _username;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql($"Host={_server};Username={_username};Password={_password};Database={_database}");


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        /* Relations */
        modelBuilder.Entity<RecipeIngredientJunction>(entity =>
        {
            entity.HasKey(e => new { e.IngredientId, e.RecipeId });
            
            entity.HasOne(d => d.Ingredient)
                .WithMany(p => p.RecipeIngredientJunction)
                .HasForeignKey(d => d.IngredientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecipeIngredientJunction_IngredientId");
            
        });
        
        /* Seed data */
        
        /* Store locations */
        // For some reason, 0x0 Guid doesn't work with EF, but it was added manaully to Up/DOWN SQL and ran on postgresqls
        // modelBuilder.Entity<StoreSection>().HasData(new StoreSection { Id = Guid.Parse("00000000-0000-0000-0000-000000000000"), Name = "N/A" });
        modelBuilder.Entity<StoreSection>().HasData(new StoreSection { Id = Guid.Parse("00000000-0000-0000-0000-000000000001"), Name = "Produce" });
        modelBuilder.Entity<StoreSection>().HasData(new StoreSection { Id = Guid.Parse("00000000-0000-0000-0000-000000000002"), Name = "Meat" });
        modelBuilder.Entity<StoreSection>().HasData(new StoreSection { Id = Guid.Parse("00000000-0000-0000-0000-000000000003"), Name = "Dairy" });
        modelBuilder.Entity<StoreSection>().HasData(new StoreSection { Id = Guid.Parse("00000000-0000-0000-0000-000000000004"), Name = "Frozen" });
        modelBuilder.Entity<StoreSection>().HasData(new StoreSection { Id = Guid.Parse("00000000-0000-0000-0000-000000000005"), Name = "Canned" });
        modelBuilder.Entity<StoreSection>().HasData(new StoreSection { Id = Guid.Parse("00000000-0000-0000-0000-000000000006"), Name = "Breakfast" });
        
        /* First Recipe */
        var recipeGuid = Guid.Parse("00000000-0000-0000-0000-000000000001");
        modelBuilder.Entity<Recipe>().HasData(new Recipe
        {
            Id = recipeGuid,
            Name = "Vegetable Soup",
            Url = "https://ochsners.us"
        });

        Guid ingredientGuid;
        ingredientGuid = Guid.Parse("00000000-0000-0000-0000-000000000001");
        modelBuilder.Entity<Ingredient>().HasData(new Ingredient { Id = ingredientGuid,
            Unit = "Medium Can", Name = "Canned Corn", Description = "",
        });
        modelBuilder.Entity<RecipeIngredientJunction>().HasData(new RecipeIngredientJunction {
            IngredientCount = 1, IngredientId = ingredientGuid, RecipeId = recipeGuid
        });

        ingredientGuid = Guid.Parse("00000000-0000-0000-0000-000000000002");
        modelBuilder.Entity<Ingredient>().HasData(new Ingredient { Id = ingredientGuid,
            Unit = "Large Can", Name = "Canned Veg All", Description = "Carrots, Potatoes, Green Beans, Onions version",
        });
        modelBuilder.Entity<RecipeIngredientJunction>().HasData(new RecipeIngredientJunction {
            IngredientCount = 1, IngredientId = ingredientGuid, RecipeId = recipeGuid
        });
        
        ingredientGuid = Guid.Parse("00000000-0000-0000-0000-000000000003");
        modelBuilder.Entity<Ingredient>().HasData(new Ingredient { Id = ingredientGuid,
            Unit = "Medium Can", Name = "Canned Diced Potatoes", Description = "16 ounces",
        });
        modelBuilder.Entity<RecipeIngredientJunction>().HasData(new RecipeIngredientJunction {
            IngredientCount = 1, IngredientId = ingredientGuid, RecipeId = recipeGuid
        });
        
        ingredientGuid = Guid.Parse("00000000-0000-0000-0000-000000000004");
        modelBuilder.Entity<Ingredient>().HasData(new Ingredient { Id = ingredientGuid,
            Unit = "Pound", Name = "Ground Turkey", Description = "",
        });
        modelBuilder.Entity<RecipeIngredientJunction>().HasData(new RecipeIngredientJunction {
            IngredientCount = 2, IngredientId = ingredientGuid, RecipeId = recipeGuid
        });
        
        ingredientGuid = Guid.Parse("00000000-0000-0000-0000-000000000005");
        modelBuilder.Entity<Ingredient>().HasData(new Ingredient { Id = ingredientGuid,
            Unit = "Medium Can", Name = "Enchilada Sauce", Description = "16 ounces",
        });
        modelBuilder.Entity<RecipeIngredientJunction>().HasData(new RecipeIngredientJunction {
            IngredientCount = 3, IngredientId = ingredientGuid, RecipeId = recipeGuid
        });
        

    }

}
