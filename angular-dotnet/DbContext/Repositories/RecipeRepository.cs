using angular_dotnet.DbModels;
using angular_dotnet.Repositories;

namespace angular_dotnet.DbContext.Repositories;

class RecipeRepository: GenericRepository < Recipe > , IRecipeRepository {
    public RecipeRepository(GrocerContext context): base(context) {}
}