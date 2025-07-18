import client from './local-qdrant-client.js';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
	await client.collections.createCollection('harry_potter_chunks', {
		vectors: {
			size: 384, // embedding dimension for all-MiniLM-L6-v2
			distance: 'Cosine',
		},
	});

	console.log('Collection created!');
})();
