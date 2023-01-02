using angular_dotnet.DbContext;
using angular_dotnet.DbModels;
using angular_dotnet.Dto;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.AspNetCore.Mvc;

namespace angular_dotnet.Controllers;

[ApiController]
[Route("[controller]")]
public class StoreSectionController : ControllerBase
{

    private readonly ILogger<StoreSectionController> _logger;
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public StoreSectionController(ILogger<StoreSectionController> logger, IMapper mapper, IUnitOfWork unitOfWork)
    {
        _logger = logger;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    [HttpGet]
    [Route("[action]")]
    public StoreSectionDto? Get(string id)
    {
        if (Guid.TryParse(id, out Guid guid))
        {
            var storeSection = _unitOfWork.StoreSection.GetById(guid);
            var storeSectionDto = _mapper.Map<StoreSectionDto>(storeSection);
            return storeSectionDto;
        }

        return null;
    }
    
    [HttpGet]
    [Route("")]
    [Route("[action]")]
    public IEnumerable<StoreSectionDto> GetAll()
    {
        var storeSectionJunctions = _unitOfWork.StoreSection.GetAll().AsQueryable();
        var storeSectionDtos = storeSectionJunctions.ProjectTo<StoreSectionDto>(_mapper.ConfigurationProvider);
        return storeSectionDtos;
    }
}
