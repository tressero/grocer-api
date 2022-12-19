using angular_dotnet.DbModels;
using AutoMapper;

namespace angular_dotnet.Dto;

public class AutoMapperProfile: Profile
{
    public AutoMapperProfile()
    {
        CreateMap<Recipe, RecipeDto>()
            .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Url,
                opt => opt.MapFrom(src => src.Url));
        CreateMap<Ingredient, IngredientDto>()
            .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description,
                opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.StoreSectionId,
                opt => opt.MapFrom(src => src.StoreSectionId))
            .ForMember(dest => dest.Unit,
                opt => opt.MapFrom(src => src.Unit));
        
        CreateMap<RecipeDto, Recipe>()
            .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Url,
                opt => opt.MapFrom(src => src.Url));
        CreateMap<IngredientDto, Ingredient>()
            .ForMember(dest => dest.Name, 
                opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description,
                opt => opt.MapFrom(src => src.Description))
            .ForMember(dest => dest.StoreSectionId,
                opt => opt.MapFrom(src => src.StoreSectionId))
            .ForMember(dest => dest.Unit,
                opt => opt.MapFrom(src => src.Unit));

        CreateMap<RecipeIngredientDto, RecipeIngredientJunction>();
        CreateMap<RecipeIngredientJunction, RecipeIngredientDto>();

        CreateMap<StoreSectionDto, StoreSection>();
        CreateMap<StoreSection, StoreSectionDto>();

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