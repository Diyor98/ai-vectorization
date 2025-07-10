import * as qdrant from 'qdrant-client';
import { pipeline } from '@xenova/transformers';

(async () => {
	const embedder = await pipeline(
		'feature-extraction',
		'Xenova/all-MiniLM-L6-v2'
	);
	const client = new qdrant.Api({ baseUrl: 'http://localhost:6333' });

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
	for await (const hit of searchResult.data.result) {
		console.log(hit);
		console.log('----');
	}
})();
