import { pipeline } from '@xenova/transformers';
import fs from 'fs';

(async () => {
	// Load embedding pipeline
	const embedder = await pipeline(
		'feature-extraction',
		'Xenova/all-MiniLM-L6-v2'
	);

	const chunks = JSON.parse(fs.readFileSync('./chunks.json', 'utf-8'));

	const embeddings = [];

	for (const chunk of chunks) {
		// Get embedding (mean pooled)
		const result = await embedder(chunk, { pooling: 'mean', normalize: true });
		embeddings.push(Array.from(result.data));
	}

	// Save embeddings
	fs.writeFileSync('./embeddings.json', JSON.stringify(embeddings, null, 2));
})();
