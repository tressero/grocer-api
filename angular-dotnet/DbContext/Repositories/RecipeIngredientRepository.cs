using angular_dotnet.DbModels;
using angular_dotnet.Repositories;

namespace angular_dotnet.DbContext.Repositories;

class RecipeIngredientRepository: GenericRepository < RecipeIngredientJunction > , IRecipeIngredientRepository {
    public RecipeIngredientRepository(GrocerContext context): base(context) {}
}