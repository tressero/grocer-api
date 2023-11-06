using angular_dotnet.DbContext;
using angular_dotnet.DbModels;
using angular_dotnet.Dto;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;

namespace angular_dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class RecipeIngredientController : ControllerBase
{

    private readonly ILogger<RecipeIngredientController> _logger;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public RecipeIngredientController(ILogger<RecipeIngredientController> logger, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    [Route("[action]")]
    public RecipeIngredientDto? Get(string id)
    {
        if (Guid.TryParse(id, out Guid guid))
        {
            var recipeIngredient = _unitOfWork.RecipeIngredient.GetById(guid);
            var recipeIngredientDto = _mapper.Map<RecipeIngredientDto>(recipeIngredient);
            return recipeIngredientDto;
        }

        return null;
    }
    
    [HttpGet]
    [Route("")]
    [Route("[action]")]
    public IEnumerable<RecipeIngredientDto> GetAll()
    {
        var recipeIngredientJunctions = _unitOfWork.RecipeIngredient.GetAll().AsQueryable();
#if DEBUG
        var list = recipeIngredientJunctions.ToList();
#endif
        var recipeIngredientDtos = recipeIngredientJunctions.ProjectTo<RecipeIngredientDto>(_mapper.ConfigurationProvider);
#if DEBUG
        var asdf = recipeIngredientDtos.ToList();
#endif
        return recipeIngredientDtos;
    }
    
    [HttpPost]
    [Route("[action]")]
    public ActionResult<RecipeIngredientDto> AddOrUpdate(RecipeIngredientDto reqRecipeIngredientDto)
    {
        RecipeIngredientJunction? resRecipeIngredientModel;
        if (reqRecipeIngredientDto.NewIngredientId.HasValue && reqRecipeIngredientDto.OldIngredientId == null)
        {
            // Addition
            var recipeIngredient = _mapper.Map<RecipeIngredientJunction>(reqRecipeIngredientDto);
            resRecipeIngredientModel = _unitOfWork.RecipeIngredient.Add(recipeIngredient);
        }
        else
        {
            var existingRecipeIngredientModel = _unitOfWork.RecipeIngredient.GetAll()
                .FirstOrDefault(x => 
                    x.RecipeId == reqRecipeIngredientDto.RecipeId && x.IngredientId == reqRecipeIngredientDto.OldIngredientId);
            if (existingRecipeIngredientModel == null) return BadRequest("Recipe ingredient that was modified no longer exists");
            
            if (reqRecipeIngredientDto is { NewIngredientId: not null, OldIngredientId: not null })
            {
                _unitOfWork.RecipeIngredient.Remove(existingRecipeIngredientModel);
                var recipeIngredientJunction = _mapper.Map<RecipeIngredientJunction>(reqRecipeIngredientDto);
                recipeIngredientJunction.IngredientId = reqRecipeIngredientDto.NewIngredientId.Value;
                resRecipeIngredientModel = _unitOfWork.RecipeIngredient.Add(recipeIngredientJunction);
            }
            else if (reqRecipeIngredientDto.NewIngredientId.HasValue)
            {
                resRecipeIngredientModel = _mapper.Map(reqRecipeIngredientDto, existingRecipeIngredientModel);
            }
            else
            {
                return BadRequest("An ingredient needs to be selected.");
            }
        }

        _unitOfWork.Save();
        var resRecipeIngredientDto = _mapper.Map<RecipeIngredientDto>(resRecipeIngredientModel);
        return Ok(resRecipeIngredientDto);
    }
    
    [HttpDelete]
    [HttpPost]
    [Route("[action]/{recipeId}/{ingredientId}")]
    public ActionResult Delete(Guid recipeId, Guid ingredientId)
    {
        if (recipeId != Guid.Empty && ingredientId != Guid.Empty)
        {
            var recipeIngredient = _unitOfWork.RecipeIngredient.GetAll()
                .FirstOrDefault(x => x.RecipeId == recipeId && x.IngredientId == ingredientId);
            if (recipeIngredient != null)
            {
                _unitOfWork.RecipeIngredient.Remove(recipeIngredient);
                _unitOfWork.Save();
                // var shouldNotExist = _unitOfWork.RecipeIngredient.GetAll()
                //     .FirstOrDefault(x => x.RecipeId == recipeId && x.IngredientId == ingredientId);
                // if (shouldNotExist == null)
                // {                
                    return Ok();            
                // }
                // return Problem("Item still exists somehow");
            }
            else
            {
                return NotFound();
            }
        }
        else
        {
            return BadRequest();
        }
    }
}
