##### TODO
- [ ] Figure out better approach for relationship between Ingredients (grocery items, e.g. bag of cheese) and recipe ingredients (measurement quantities, e.g. cup of cheese).
  - i.e. should there be an intermediary table to translate or break down StoreIngredients into components?
    - E.g. Large Bag (1) == Cups (10) == oz (32) = tbsp (16*10)
      - Categorizing, it's
        - Volume (e.g. Cup), and it's derivatives (e.g. tbsp, tsp, kg)
        - Weight (e.g. Ounce) and it's derivatives (e.g. lb)
        - Qualitative (e.g. Large Bag, Medium Bag, or Medium Box), and it's above relationships defined
- [ ] Editing Recipes
  - [ ] Refresh recipeIngredients so it's less of a pain
  - [ ] Needs names + working URLs to edit or when creating
  - [ ] Prompt when deleting recipe
- [ ] Shopping List
  - [ ] Select Recipe, Select Quantity, 
  - [ ] Output

From above, focus on 1 + 2 since little time to spend on this project:
1. Allow edits or creation of recipe URLs/Names (currently in SQL only)
2. Prevent refresh needed for recipe's ingredient add
3. Output actual list (SQL is fine for now)
```bash

# INITIALIZE
INIT_MIGRATION_NAME='InitialCreate'
DATE_NOW=$(TZ=UTC date +"%Y%m%d%H%M") # E.g. 202210272247, same format as migrations used for up.sql, down.sql
dotnet ef migrations add "$INIT_MIGRATION_NAME"
dotnet ef migrations script -o ./Migrations/SQL/"$DATE_NOW"_"$INIT_MIGRATION_NAME".up.sql

##############################################

# UPDATE
PREV_MIGRATION_NAME='InitialCreate'
NEW_MIGRATION_NAME='InitialSeed'
DATE_NOW=$(TZ=UTC date +"%Y%m%d%H%M") # E.g. 202210272247, same format as migrations used for up.sql, down.sql

## Create an Update
dotnet ef migrations add "$NEW_MIGRATION_NAME"

## Generate up, down SQL scripts to run an upgrade manually (NOTE: files may take a while to appear)
dotnet ef migrations script "$PREV_MIGRATION_NAME" "$NEW_MIGRATION_NAME" --verbose -o ./Migrations/SQL/"$DATE_NOW"_"$NEW_MIGRATION_NAME".up.sql
dotnet ef migrations script "$NEW_MIGRATION_NAME" "$PREV_MIGRATION_NAME" --verbose -o ./Migrations/SQL/"$DATE_NOW"_"$NEW_MIGRATION_NAME".down.sql


```

Some links

.NET
https://customer.elephantsql.com/instance/
https://dev.to/moe23/add-automapper-to-net-6-3fdn
https://www.c-sharpcorner.com/article/automapper-in-net-6-web-api/
https://stackoverflow.com/questions/10900250/select-all-rows-using-entity-framework
https://www.c-sharpcorner.com/article/implement-unit-of-work-and-generic-repository-pattern-in-a-web-api-net-core-pro/

Angular
https://material.angular.io/guide/getting-started
```angular2html
ng add @angular/material #(adds to packge.json)

```

# Angular Client App

Run below. Note: due to SPA proxy, you will not be able to access swagger.
```bash
cd ~/RiderProjects/app-grocer/angular-dotnet/ClientApp/ && npm run start
```