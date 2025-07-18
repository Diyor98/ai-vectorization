import client from './local-qdrant-client.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
	const embeddings = JSON.parse(fs.readFileSync('./embeddings.json', 'utf-8'));
	const chunks = JSON.parse(fs.readFileSync('./chunks.json', 'utf-8'));

	const points = embeddings.map((vector, idx) => ({
		id: idx,
		vector,
		payload: { text: chunks[idx] },
	}));

	await client.collections.upsertPoints('harry_potter_chunks', { points });

	console.log('Vectors uploaded to Qdrant!');
})().catch(console.error);
