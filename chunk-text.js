import fs from 'fs';
import natural from 'natural';

const { SentenceTokenizer } = natural;
const rawText = fs.readFileSync('./harry_potter.txt', 'utf-8');

const tokenizer = new SentenceTokenizer();
const sentences = tokenizer.tokenize(rawText);

const chunkSize = 5; // sentences per chunk
const chunks = [];

for (let i = 0; i < sentences.length; i += chunkSize) {
	const chunk = sentences.slice(i, i + chunkSize).join(' ');
	chunks.push(chunk);
}

// Save chunks
fs.writeFileSync('./chunks.json', JSON.stringify(chunks, null, 2));
