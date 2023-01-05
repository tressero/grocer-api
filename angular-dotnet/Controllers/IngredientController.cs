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

    [HttpPatch]
    [Route("[action]")]
    [Route("[action]/{id}")]
    [ProducesResponseType(typeof(List<IngredientDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(CustomResponseObject), (int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(CustomResponseObject), (int)HttpStatusCode.NotFound)]
    public IActionResult Update(IngredientDto ingredientDto)
    {
        var ingredientToUpdate = _unitOfWork.Ingredient.GetById(ingredientDto.Id);
        if (ingredientToUpdate != null)
        {
            var newIngredient = _mapper.Map(ingredientDto, ingredientToUpdate);
            _unitOfWork.Save();
            return Ok(_mapper.Map(ingredientToUpdate, ingredientDto)); // Return whatever is in the DB
        }
        return Conflict("409 conflict - guid doesn't exist.");
        
        var ingredient = _unitOfWork.Ingredient.GetById(ingredientDto.Id);
        _mapper.Map(ingredientDto, ingredient);
        try
        {
            _unitOfWork.Save();
            return Ok(ingredientDto);
        }
        catch (Exception ex)
        {
            return UnprocessableEntity(ex);
        }
    }
    [HttpPost]
    [Route("[action]")]
    [ProducesResponseType(typeof(List<IngredientDto>), (int)HttpStatusCode.OK)]
    [ProducesResponseType(typeof(CustomResponseObject), (int)HttpStatusCode.Unauthorized)]
    [ProducesResponseType(typeof(CustomResponseObject), (int)HttpStatusCode.NotFound)]
    public IActionResult Add(IngredientDto ingredientDto)
    {
        if (_unitOfWork.Ingredient.GetById(ingredientDto.Id) == null)
        {
            var ingredient = _mapper.Map<Ingredient>(ingredientDto);
            var entity = _unitOfWork.Ingredient.Add(ingredient);
            _unitOfWork.Save();
            return Ok(_mapper.Map<IngredientDto>(entity));
        }
        return Conflict("409 conflict - guid already exists.");
    }

    
    
}
