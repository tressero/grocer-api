select R."Name", SS."Name", I."Name", RI."IngredientCount", I."Unit"  from "Recipe" R
                                                                               left join "RecipeIngredientJunction" RI
                                                                                         on RI."RecipeId" = R."Id"
                                                                               left join "Ingredient" I
                                                                                         on I."Id" = RI."IngredientId"
                                                                               left join "StoreSection" SS
                                                                                         on I."StoreSectionId" = SS."Id"
where 
--   or R."Name" LIKE 'Vegetable Soup'
--   or 
    R."Name" LIKE 'Veggie Bake'
--   or R."Name" LIKE 'Instant Pot Chicken Cacciatore'
  or R."Name" LIKE 'Portobello Fajitas'
--   or R."Name" LIKE 'Quick Vegetarian Chili'
   or R."Name" LIKE 'Chickpeas, Sweet Pot + Broc'
   or R."Name" LIKE 'Weekly / Bi-weekly Purchases'
   or R."Name" LIKE 'White Chicken Chili'
   or R."Name" LIKE 'WW Salmon'
order by SS."Name", I."Name"