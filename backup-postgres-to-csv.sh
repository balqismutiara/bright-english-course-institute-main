#!/bin/bash

# backup-postgres-to-csv.sh
# Usage:
#   chmod +x backup-postgres-to-csv.sh
#   ./backup-postgres-to-csv.sh
# or specify env vars:
#   PGPASSWORD=yourpass DB_HOST=localhost DB_PORT=5432 DB_USER=postgres DB_NAME=bright_english ./backup-postgres-to-csv.sh

DB_HOST=${DB_HOST:-localhost}
DB_PORT=${DB_PORT:-5432}
DB_USER=${DB_USER:-postgres}
DB_PASSWORD=${PGPASSWORD:-${DB_PASSWORD:-}}
DB_NAME=${DB_NAME:-bright_english}
OUTPUT_DIR=${OUTPUT_DIR:-./postgres-csv-backup}

mkdir -p "$OUTPUT_DIR"

export PGPASSWORD="$DB_PASSWORD"

echo "Backing up PostgreSQL database '$DB_NAME' to CSV files in $OUTPUT_DIR"

for table in students accounts teachers reports; do
  echo "Exporting $table..."
  psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -c "\copy $table TO '$OUTPUT_DIR/$table.csv' CSV HEADER"
  if [ $? -ne 0 ]; then
    echo "ERROR: Failed to export table $table"
    exit 1
  fi
done

echo "Backup complete:"
ls -1 "$OUTPUT_DIR"
