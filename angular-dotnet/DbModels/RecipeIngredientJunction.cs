using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace angular_dotnet.DbModels;

public class RecipeIngredientJunction
{
    public RecipeIngredientJunction()
    {

    }
    [Key]
    public Guid IngredientId { get; set; }
    public int IngredientCount { get; set; }
    [Key]
    public Guid RecipeId { get; set; }
    
    public virtual Ingredient Ingredient { get; set; }
    public virtual Recipe Recipe { get; set; } 
}