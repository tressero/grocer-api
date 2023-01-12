﻿using angular_dotnet.DbContext;
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
        var recipeIngredientDtos = recipeIngredientJunctions.ProjectTo<RecipeIngredientDto>(_mapper.ConfigurationProvider);
        return recipeIngredientDtos;
    }
    
    [HttpPost]
    [Route("[action]")]
    [Route("[action]/{recipeId}/{ingredientId}")]
    public IEnumerable<RecipeIngredientDto> AddOrUpdate(string recipeId, string ingredientId, RecipeIngredientDto recipeIngredientDto)
    {
        var recipeIngredientJunctions = _unitOfWork.RecipeIngredient.GetAll().AsQueryable();
        var recipeIngredientDtos = recipeIngredientJunctions.ProjectTo<RecipeIngredientDto>(_mapper.ConfigurationProvider);
        return recipeIngredientDtos;
    }
    [HttpPost]
    [Route("[action]/{recipeId}/{ingredientId}")]
    public IActionResult Delete(string recipeId, string ingredientId)
    {
        // Guid recipeGuid;
        // Guid ingredientGuid;
        if (Guid.TryParse(recipeId, out Guid recipeGuid) && Guid.TryParse(ingredientId, out Guid ingredientGuid))
        {
            var recipeIngredient = _unitOfWork.RecipeIngredient.GetAll()
                .FirstOrDefault(x => x.RecipeId == recipeGuid && x.IngredientId == ingredientGuid);
            if (recipeIngredient != null)
            {
                _unitOfWork.RecipeIngredient.Remove(recipeIngredient);
                return Ok();            
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
