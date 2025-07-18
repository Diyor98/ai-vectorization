import * as qdrant from 'qdrant-client';

export default new qdrant.Api({ baseUrl: 'http://localhost:6333' });
