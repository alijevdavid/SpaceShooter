using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RecipeBookBackend.Entities
{
    public enum AmountType
    {
        darab,teáskanál,evőkanál,kávéskanál,gramm,kilogramm,dekagramm,liter,deciliter,mililiter,gerezd,csokor,csipet,szál,adag
    }

    public class Ingredient
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? IngredientEn { get; set; }


        public Ingredient(string name)
        {
            this.Name = name;
        }

        public override string ToString()
        {
            return this.Name;
        }
    }
}
