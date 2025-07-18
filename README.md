Markdown:

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

## Using OpenAI for Embeddings

To use OpenAI for generating embeddings, follow these steps:

1. **Set up your environment**
   Add your OpenAI API key to a `.env` file:

   ```
   OPENAI_KEY=your-api-key-here
   ```

2. **Run the following commands in order:**

   ```bash
   node parser.js
   node chunk-text.js
   docker run -p 6333:6333 -p 6334:6334 qdrant/qdrant
   node openai-create-collection.js
   node openai-upload-vectors.js
   node openai-query.js
   ```

> 💡 Make sure all dependencies are installed (`npm install`) and your Node.js version is compatible with the project.
