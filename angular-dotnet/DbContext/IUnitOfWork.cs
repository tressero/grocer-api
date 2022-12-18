using angular_dotnet.Repositories;

namespace angular_dotnet.DbContext;

public interface IUnitOfWork: IDisposable {
    
    IIngredientRepository Ingredient {
        get;
    }
    IRecipeIngredientRepository RecipeIngredient {
        get;
    }
    IRecipeRepository Recipe {
        get;
    }
    IStoreSectionRepository StoreSection {
        get;
    }

    int Save();
}