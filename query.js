import client from './local-qdrant-client.js';
import { pipeline } from '@xenova/transformers';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
	const embedder = await pipeline(
		'feature-extraction',
		'Xenova/all-MiniLM-L6-v2'
	);

	const queryText = 'Where did Harry go to school?';

	const result = await embedder(queryText, {
		pooling: 'mean',
		normalize: true,
	});
	const queryEmbedding = Array.from(result.data);

	const searchResult = await client.collections.searchPoints(
		'harry_potter_chunks',
		{
			vector: queryEmbedding,
			limit: 3,
			with_payload: true,
		}
	);

	console.log('Top Matches:');
	for (const hit of searchResult.data.result) {
		console.log(hit);
		console.log('----');
	}

	const retrievedTexts = searchResult.data.result.map(
		(res) => res.payload.text
	);
	const context = retrievedTexts.join('\n\n');

	const prompt = `
		You are a helpful assistant answering questions about Harry Potter.

		Context:
		${context}

		Question:
		${queryText}

		Answer in a concise sentence only within the context:
		`;

	const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

	const completion = await openai.chat.completions.create({
		model: 'gpt-4.1-nano',
		messages: [
			{
				role: 'system',
				content:
					'You are a helpful assistant answering questions about Harry Potter.',
			},
			{ role: 'user', content: prompt },
		],
	});

	const finalAnswer = completion.choices[0].message.content;

	console.log('Answer:');
	console.log(finalAnswer);
})();
