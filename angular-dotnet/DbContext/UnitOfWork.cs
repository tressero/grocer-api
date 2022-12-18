using angular_dotnet.DbContext.Repositories;
using angular_dotnet.DbModels;
using angular_dotnet.Repositories;

namespace angular_dotnet.DbContext;

public class UnitOfWork: IUnitOfWork {
    
    private GrocerContext context;
    public UnitOfWork(GrocerContext context) {
        this.context = context;
        Ingredient = new IngredientRepository(this.context);
        RecipeIngredient = new RecipeIngredientRepository(this.context);
        Recipe = new RecipeRepository(this.context);
        StoreSection = new StoreSectionRepository(this.context);
    }

    public void Dispose() {
        context.Dispose();
    }

    public IIngredientRepository Ingredient { get; }
    public IRecipeIngredientRepository RecipeIngredient { get; }
    public IRecipeRepository Recipe { get; }
    public IStoreSectionRepository StoreSection { get; }

    public int Save() {
        return context.SaveChanges();
    }
}