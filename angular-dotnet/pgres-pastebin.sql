
CREATE USER tressero_np WITH PASSWORD 'Adora1!';
ALTER USER tressero_np SET search_path TO 'nonprod_';
// Create a schema for user joe; the schema will also be named joe: (tressero_np)
CREATE USER tressero1_np WITH PASSWORD 'Adora1!';
          

CREATE SCHEMA AUTHORIZATION joe;
ALTER DEFAULT PRIVILEGES IN SCHEMA  GRANT SELECT ON TABLES TO example_user;


CREATE ROLE tressero_np WITH ADMIN tressero_np_admin;
DROP ROLE tressero_np;
DROP ROLE tressero_np_login;
DROP ROLE tressero1_np;
DROP ROLE tressero_np_admin;
DROP ROLE tressero_np_role;
drop role tresser

CREATE USER tressero_np_admin with LOGIN PASSWORD 'Adora1!';
CREATE ROLE tressero_np_role;
GRANT superuser, 'create database' to tressero_np_role;
GRANT pg_write_all_data to tressero_np_role;
CREATE SCHEMA IF NOT EXISTS tressero_np AUTHORIZATION tressero_np;


-- GET ALL DATABASE USERS
SELECT usename AS role_name,
       CASE
           WHEN usesuper AND usecreatedb THEN
               CAST('superuser, create database' AS pg_catalog.text)
           WHEN usesuper THEN
               CAST('superuser' AS pg_catalog.text)
           WHEN usecreatedb THEN
               CAST('create database' AS pg_catalog.text)
           ELSE
               CAST('' AS pg_catalog.text)
           END role_attributes
FROM pg_catalog.pg_user
ORDER BY role_name desc;

-- GET ALL ROLES OF USERS
WITH RECURSIVE cte AS (
    SELECT oid FROM pg_roles WHERE rolname = 'maxwell'

    UNION ALL
    SELECT m.roleid
    FROM   cte
               JOIN   pg_auth_members m ON m.member = cte.oid
)
SELECT oid, oid::regrole::text AS rolename FROM cte;  -- oid & name

select * from pg_roles;


----- CREATE THE ROLE + USER "tressero_np"
CREATE USER tressero_np WITH ENCRYPTED PASSWORD '<pass>';
ALTER USER tressero_np with LOGIN PASSWORD '<pass>>';

GRANT ALL PRIVILEGES ON DATABASE postgres TO tressero_np;
grant connect on database postgres to tressero_np;
grant tressero_np to linpostgres; -- Root
CREATE SCHEMA IF NOT EXISTS tressero_np AUTHORIZATION tressero_np;

----- SET DEFAULT SCHEMA FOR USER
-- To change a default schema at the user/role level, the “ALTER USER” or “ALTER ROLE” command is used with the “SET SEARCH_PATH” clause:
-- ALTER ROLE|USER role_name SET search_path TO schema_name;
ALTER USER tressero_np SET search_path to tressero_np;

alter user tressero_np superuser;
alter user tressero_np 
