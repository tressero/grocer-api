using System.Net;
using angular_dotnet.DbContext;
using angular_dotnet.DbModels;
using angular_dotnet.Dto;
using angular_dotnet.Formatters;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;

namespace angular_dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class IngredientController : ControllerBase
{

    private readonly ILogger<IngredientController> _logger;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public IngredientController(ILogger<IngredientController> logger, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    [Route("[action]")]
    [ProducesResponseType(typeof(IngredientDto), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(CustomResponseObject), (int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(CustomResponseObject), (int)HttpStatusCode.NotFound)]
    public IngredientDto Get(string id)
    {
        if (Guid.TryParse(id, out Guid guid))
        {
            var ingredient = _unitOfWork.Ingredient.GetById(guid);
            var ingredientDto = _mapper.Map<IngredientDto>(ingredient);
            return ingredientDto;
        }

        return null;
    }
    [HttpGet]
    [Route("")]
    [Route("[action]")]
    [ProducesResponseType(typeof(List<IngredientDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(CustomResponseObject), (int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(CustomResponseObject), (int)HttpStatusCode.NotFound)]
    public IEnumerable<IngredientDto>? GetAll()
    {
        var ingredients = _unitOfWork.Ingredient.GetAll().AsQueryable();
        var ingredientDtos = ingredients.ProjectTo<IngredientDto>(_mapper.ConfigurationProvider);
        if (!ingredientDtos.Any())
        {
            return null;
        }
        return ingredientDtos;
    }
}
