namespace angular_dotnet.DbModels;

public class Recipe
{
    public Recipe()
    {
        
    }
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Url { get; set; }
}