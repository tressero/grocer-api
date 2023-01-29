using angular_dotnet.DbContext;
using angular_dotnet.DbModels;
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
    private readonly IUnitOfWork _unitOfWork;

    public RecipeController(ILogger<RecipeController> logger, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    [Route("[action]")]
    public RecipeDto Get(string id)
    {
        if (Guid.TryParse(id, out Guid guid))
        {
            var recipe = _unitOfWork.Recipe.GetById(guid);
            var recipeDto = _mapper.Map<RecipeDto>(recipe);
            return recipeDto;
        }

        return null;
    }
    
    [HttpGet]
    [Route("")]
    [Route("[action]")]
    public IEnumerable<RecipeDto> GetAll()
    {
        var recipes = _unitOfWork.Recipe.GetAll().AsQueryable();
        var recipeDtos = recipes.ProjectTo<RecipeDto>(_mapper.ConfigurationProvider);
        return recipeDtos;
    }
    
    [HttpPost]
    [Route("[action]")]
    [Route("[action]/{recipeId}")]
    public ActionResult<RecipeDto> AddOrUpdate(RecipeDto recipeDto, Guid recipeId)
    {
        var recipeToUpdate = _unitOfWork.Recipe.GetAll().FirstOrDefault(x => x.Id == recipeDto.Id);
        
        Recipe? responseRecipe;
        if (recipeToUpdate == null)
        {
            var recipe = _mapper.Map<Recipe>(recipeDto);
            responseRecipe = _unitOfWork.Recipe.Add(recipe);
        }
        else
        {
            responseRecipe = _mapper.Map(recipeDto, recipeToUpdate);
        }
        _unitOfWork.Save();
        return Ok(_mapper.Map<RecipeDto>(responseRecipe));
    }
    [HttpDelete]
    [Route("[action]/{recipeId}")]
    public IActionResult Delete(RecipeDto recipeDto, Guid recipeId)
    {
        if (recipeId != Guid.Empty)
        {
            var recipe = _unitOfWork.Recipe.GetAll()
                .FirstOrDefault(x => x.Id == recipeId);
            if (recipe != null)
            {
                _unitOfWork.Recipe.Remove(recipe);
                return Ok();            
            }
            return NotFound();
        }
        return BadRequest("Invalid or Empty Guid");
    }
}
