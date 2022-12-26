using angular_dotnet.DbModels;
using AutoMapper;

namespace angular_dotnet.Dto;

public class AutoMapperProfile: Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Recipe, RecipeDto>();
        CreateMap<RecipeDto, Recipe>();

        CreateMap<Ingredient, IngredientDto>();
        CreateMap<IngredientDto, Ingredient>();

        CreateMap<RecipeIngredientJunction, RecipeIngredientDto>();
        CreateMap<RecipeIngredientDto, RecipeIngredientJunction>();

        CreateMap<StoreSection, StoreSectionDto>();
        CreateMap<StoreSectionDto, StoreSection>();

        // MULTI MAP - https://stackoverflow.com/questions/19544133/automapper-multi-object-source-and-one-destination

        // TODO: Figure out 3 way mapping, so can map RecipeIngredient directly to the ingredient itself (and create)?
        // CreateMap<RecipeIngredientJunction, RecipeIngredientDto>()
        //     .ForMember(dest => dest.Ingredient,
        //         opt => opt.MapFrom(src => src.Name))
        //     .ForMember(dest => dest.Url,
        //         opt => opt.MapFrom(src => src.Url));

        // CreateMap<CategoryDto, Category>()
        //     .ForMember(dest => dest.CategoryName,
        //         opt => opt.MapFrom(src => src.Name))
        //     .ForMember(dest => dest.CategoryId,
        //         opt => opt.Ignore());
    }
}