Sure—here’s your **formatted `README.md`** content, nicely structured in Markdown:

````markdown
# Project Setup

## Requirements

- **Node.js** v22.17.0 or higher
- **Docker** installed and running

## Setup Instructions

Run the following commands in order:

1. Parse the input data:
   ```bash
   node parser.js
   ```
````

2. Chunk the text:

   ```bash
   node chunk-text.js
   ```

3. Generate embeddings:

   ```bash
   node embed.js
   ```

4. Start Qdrant in Docker:

   ```bash
   docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
   ```

5. Create the Qdrant collection:

   ```bash
   node create-collection.js
   ```

6. Upload the vectors to Qdrant:

   ```bash
   node upload-vectors.js
   ```

7. Query the collection:

   ```bash
   node query.js
   ```
