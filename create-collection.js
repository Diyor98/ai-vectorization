import * as qdrant from 'qdrant-client';

(async () => {
	const client = new qdrant.Api({ baseUrl: 'http://localhost:6333' });

	await client.collections.createCollection('harry_potter_chunks', {
		vectors: {
			size: 384, // embedding dimension for all-MiniLM-L6-v2
			distance: 'Cosine',
		},
	});

	console.log('Collection created!');
})();
