import client from './local-qdrant-client.js';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
	await client.collections.createCollection('openai_embeddings_small', {
		vectors: {
			size: 1536, // same as text-embedding-3-small
			distance: 'Cosine',
		},
	});

	console.log('Collection created!');
})();
