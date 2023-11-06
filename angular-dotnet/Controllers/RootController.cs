using Microsoft.AspNetCore.Mvc;

namespace angular_dotnet.Controllers;

[Route("")]
public class RootController
{
    [HttpGet]
    public string Get()
    {
        return "0.2.0";
    }
    
}