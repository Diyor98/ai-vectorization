import client from './local-qdrant-client.js';
import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

(async () => {
	const queryText = 'Where does Harry study?';

	const hypoText = await hydeQueryRAG(queryText);

	const response = await openai.embeddings.create({
		model: 'text-embedding-3-small',
		input: hypoText,
	});

	console.log('Openai response,', response.data[0].embedding);
	const searchResult = await client.collections.searchPoints(
		'openai_embeddings_small',
		{
			vector: response.data[0].embedding,
			limit: 5,
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

You must follow these rules carefully:

1. You can ONLY answer based on the CONTEXT provided below.
2. If the answer is not explicitly stated in the context, say: "I don't know based on the provided context."
3. Do not use any prior knowledge or assumptions.
4. Answer in a concise sentence.

CONTEXT:
${context}

QUESTION:
${queryText}

YOUR ANSWER:
`;

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
})().catch(console.error);

async function hydeQueryRAG(userQuery) {
	const answer = await openai.chat.completions.create({
		model: 'gpt-4.1-nano',
		messages: [
			{
				role: 'system',
				content: `You are a Harry Potter expert. Answer the question below based only on the Harry Potter universe.
				If the question is not related to Harry Potter, respond with: "ASK ABOUT HARRY POTTER ONLY."`,
			},
			{
				role: 'user',
				content: userQuery,
			},
		],
	});

	const hypoText = answer.choices[0].message.content;

	console.log('Hypothetical text: ', hypoText);

	return hypoText;
}
