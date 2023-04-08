#!/bin/bash

# set variables
DATABASE_URL=$DATABASE_URL
echo "Database URL is: $DATABASE_URL"
COLLECTIONS=("collection1" "collection2" "collection3") # add collection names as needed
OUTPUT_DIR="src/models" # directory to save schema files

# ensure output directory exists
mkdir -p $OUTPUT_DIR

# iterate over collections
for COLLECTION in "${COLLECTIONS[@]}"
do
    # generate schema file
    FILENAME="$COLLECTION.json"
    mongoimport-schema --uri $DATABASE_URL --authenticationDatabase=admin --collection $COLLECTION --file "$OUTPUT_DIR/$FILENAME"
done
