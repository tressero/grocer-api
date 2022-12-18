using angular_dotnet.DbModels;
using angular_dotnet.Repositories;

namespace angular_dotnet.DbContext.Repositories;

class IngredientRepository: GenericRepository < Ingredient > , IIngredientRepository {
    public IngredientRepository(GrocerContext context): base(context) {}
}