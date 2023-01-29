namespace angular_dotnet.Dto;

public class RecipeDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
    
    public List<RecipeIngredientDto>? RecipeIngredients { get; set; }
}