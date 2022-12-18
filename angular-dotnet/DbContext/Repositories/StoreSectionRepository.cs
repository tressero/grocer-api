using angular_dotnet.DbModels;
using angular_dotnet.Repositories;

namespace angular_dotnet.DbContext.Repositories;

class StoreSectionRepository: GenericRepository < StoreSection > , IStoreSectionRepository {
    public StoreSectionRepository(GrocerContext context): base(context) {}
}