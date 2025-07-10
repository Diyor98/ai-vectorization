Requirements node.js v22.17.0 or higher
Run the commands in the following order:

node parser.js
node chunk-text.js
node embed.js
docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
node create-collection.js
node upload-vectors.js
node query.js
