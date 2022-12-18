using angular_dotnet.DbModels;
using Microsoft.EntityFrameworkCore;

namespace angular_dotnet.DbContext;

public class GrocerContext : Microsoft.EntityFrameworkCore.DbContext
{
    public DbSet<Ingredient> Ingredient { get; set; }
    public DbSet<Recipe> Recipe { get; set; }
    public DbSet<RecipeIngredientJunction> RecipeIngredientJunction { get; set; }
    public DbSet<StoreSection> StoreSection { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseNpgsql(@"Host=myserver;Username=mylogin;Password=mypass;Database=mydatabase");


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<RecipeIngredientJunction>(entity =>
        {
            entity.HasKey(e => new { e.IngredientId, e.RecipeId });
            
            entity.HasOne(d => d.Ingredient)
                .WithMany(p => p.RecipeIngredientJunction)
                .HasForeignKey(d => d.IngredientId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RecipeIngredientJunction_IngredientId");
        });
        

    }

}
