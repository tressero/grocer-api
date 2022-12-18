using angular_dotnet.Dto;
using Microsoft.AspNetCore.Mvc;

namespace angular_dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipeController : ControllerBase
{

    private readonly ILogger<WeatherForecastController> _logger;

    public RecipeController(ILogger<WeatherForecastController> logger)
    {
        _logger = logger;
    }

    // [HttpGet]
    // public IEnumerable<RecipeDto> GetRecipes()
    // {
    //     
    // }
}
