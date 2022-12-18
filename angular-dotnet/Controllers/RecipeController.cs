using angular_dotnet.DbContext;
using angular_dotnet.Dto;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;

namespace angular_dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipeController : ControllerBase
{

    private readonly ILogger<RecipeController> _logger;
    private readonly IMapper _mapper;

    public RecipeController(ILogger<RecipeController> logger, IMapper mapper)
    {
        _logger = logger;
        _mapper = mapper;
    }

    [HttpGet]
    public IEnumerable<RecipeDto> GetRecipes()
    {
        using (GrocerContext context = new GrocerContext())// TODO: Don't call context directly from controller, use unitOfWork ?
        {
            var recipes = (from r in context.Recipe select r);
            var recipeDtos = recipes.ProjectTo<RecipeDto>(_mapper.ConfigurationProvider);
            return recipeDtos;
        }
    }
}
