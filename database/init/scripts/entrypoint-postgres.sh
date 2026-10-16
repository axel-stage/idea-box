#!/bin/bash
set -e
# connect to postgres db with postgres role
psql -v ON_ERROR_STOP=1 \
    --username ${POSTGRES_USER} \
    --dbname ${POSTGRES_DB} <<-EOSQL
\timing
\conninfo

-- role
CREATE ROLE ${DB_ADMIN}
WITH LOGIN
PASSWORD '$(cat $DB_ADMIN_SECRET_FILE)'
CONNECTION LIMIT 100
VALID UNTIL 'infinity'
NOCREATEDB
NOSUPERUSER
NOCREATEROLE
NOINHERIT
NOBYPASSRLS
NOREPLICATION;

-- database
CREATE DATABASE ${DB_NAME}
WITH OWNER ${DB_ADMIN}
TEMPLATE template1
ENCODING='UTF8';
\q
EOSQL

# connect to created db with postgres role
psql -v ON_ERROR_STOP=1 \
    --username ${POSTGRES_USER} \
    --dbname ${DB_NAME} <<-EOSQL
\timing
\conninfo

-- schema
DROP SCHEMA IF EXISTS public CASCADE;
CREATE SCHEMA IF NOT EXISTS ${SCHEMA} AUTHORIZATION ${DB_ADMIN};
CREATE SCHEMA IF NOT EXISTS pgtap AUTHORIZATION ${DB_ADMIN};
SET search_path TO ${SCHEMA};

-- extension
CREATE EXTENSION IF NOT EXISTS dblink
WITH SCHEMA ${SCHEMA}
VERSION '1.2';

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
WITH SCHEMA ${SCHEMA};

CREATE EXTENSION IF NOT EXISTS pgtap
WITH SCHEMA pgtap
VERSION '1.3.4';

\q
EOSQL

# change default postgres password to secret
psql -v ON_ERROR_STOP=1 \
    --username ${POSTGRES_USER} \
    --dbname ${POSTGRES_DB} <<EOSQL
ALTER USER ${POSTGRES_USER} WITH PASSWORD '$(cat $POSTGRES_SECRET_FILE)';
\q
EOSQL

# connect to created db with dbuser role
psql -v ON_ERROR_STOP=1 \
  --username=${DB_ADMIN} \
  --dbname=${DB_NAME} <<-EOSQL
\timing
\conninfo
\i /tmp/schemas/ddl_idea_box.sql
\i /tmp/schemas/insert_test_data.sql
\q
EOSQL


