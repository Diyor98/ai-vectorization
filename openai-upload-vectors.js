import * as qdrant from 'qdrant-client';
import OpenAI from 'openai';
import fs from 'node:fs';

(async () => {
	const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });
	const client = new qdrant.Api({ baseUrl: 'http://localhost:6333' });

	const chunks = JSON.parse(fs.readFileSync('./chunks.json', 'utf-8'));
	const batchSize = 10;

	const points = [];

	for (let i = 0; i < chunks.length; i += batchSize) {
		const batch = chunks.slice(i, i + batchSize);
		console.log(`Embedding batch ${i / batchSize + 1}...`);

		const response = await openai.embeddings.create({
			model: 'text-embedding-3-small',
			input: batch,
		});

		for (let j = 0; j < batch.length; j++) {
			const embedding = response.data[j].embedding;
			points.push({
				id: i + j,
				vector: embedding,
				payload: { text: batch[j] },
			});
		}
	}

	fs.writeFileSync('./openai_embeddings.json', JSON.stringify(points, null, 2));

	for (let i = 0; i < points.length; i += batchSize) {
		const batch = points.slice(i, i + batchSize);
		await client.collections.upsertPoints('openai_embeddings_small', {
			points: batch,
		});
	}

	console.log('Uploaded embeddings to Qdrant!');
})().catch(console.error);
