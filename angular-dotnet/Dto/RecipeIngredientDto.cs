namespace angular_dotnet.Dto;

public class RecipeIngredientDto
{
    public Guid RecipeId { get; set; }
    public RecipeDto? Recipe { get; set; }
    
    public Guid IngredientId { get; set; }
    public IngredientDto? Ingredient { get; set; }
    
    public int IngredientCount { get; set; }
}