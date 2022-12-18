namespace angular_dotnet.DbModels;

public class Ingredient
{
    public Ingredient()
    {
        RecipeIngredientJunction = new HashSet<RecipeIngredientJunction>();

    }
    public Guid Id { get; set; }
    public string Unit { get; set; }
    public Guid StoreSectionId { get; set; }

    public virtual StoreSection StoreSection
    {
        get;
        set;
    }
    
    public virtual ICollection<RecipeIngredientJunction> RecipeIngredientJunction { get; set; }

}