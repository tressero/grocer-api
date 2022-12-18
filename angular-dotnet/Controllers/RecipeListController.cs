using angular_dotnet.DbContext;
using angular_dotnet.Dto;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;

namespace angular_dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipeListController : ControllerBase
{

    private readonly ILogger<RecipeListController> _logger;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public RecipeListController(ILogger<RecipeListController> logger, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    public IEnumerable<RecipeDto> Get()
    {
        var recipes = _unitOfWork.Recipe.GetAll().AsQueryable();
        var recipeDtos = recipes.ProjectTo<RecipeDto>(_mapper.ConfigurationProvider);
        return recipeDtos;
    }
}
