import * as qdrant from 'qdrant-client';

(async () => {
	const client = new qdrant.Api({ baseUrl: 'http://localhost:6333' });

	await client.collections.createCollection('openai_embeddings_small', {
		vectors: {
			size: 1536, // same as text-embedding-3-small
			distance: 'Cosine',
		},
	});

	console.log('Collection created!');
})();
