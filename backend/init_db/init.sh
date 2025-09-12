#!/bin/bash
set -e



# Connect to the correct DB (ProductionDatabase, not 'database')
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname="ProductionDatabase" <<-EOSQL
    CREATE SCHEMA IF NOT EXISTS database;
EOSQL

echo "✅ Database and schema created successfully."