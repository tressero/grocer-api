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
        
        CreateMap<RecipeDto, Recipe>()
            .ForMember(dest => dest.Name,
                opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Url,
                opt => opt.MapFrom(src => src.Url));
            
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