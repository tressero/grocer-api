namespace angular_dotnet.Dto;

public class IngredientDto
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Unit { get; set; }
    public Guid StoreSectionId { get; set; }
}