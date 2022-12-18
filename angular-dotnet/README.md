
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


https://customer.elephantsql.com/instance/