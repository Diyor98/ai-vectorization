import * as qdrant from 'qdrant-client';
import fs from 'fs';

(async () => {
	const client = new qdrant.Api({ baseUrl: 'http://localhost:6333' });

	const embeddings = JSON.parse(fs.readFileSync('./embeddings.json', 'utf-8'));
	const chunks = JSON.parse(fs.readFileSync('./chunks.json', 'utf-8'));

	const points = embeddings.map((vector, idx) => ({
		id: idx,
		vector,
		payload: { text: chunks[idx] },
	}));

	await client.collections.upsertPoints('harry_potter_chunks', { points });

	console.log('Vectors uploaded to Qdrant!');
})();
