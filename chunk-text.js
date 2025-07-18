import fs from 'fs';
import natural from 'natural';
import dotenv from 'dotenv';
dotenv.config();

const { SentenceTokenizer } = natural;
const rawText = fs.readFileSync('./harry_potter.txt', 'utf-8');

const tokenizer = new SentenceTokenizer();
const sentences = tokenizer.tokenize(rawText);

const chunkSize = +(process.env.CHUNK_SIZE ?? 5); // sentences per chunk
const chunks = [];

for (let i = 0; i < sentences.length; i += chunkSize) {
	const chunk = sentences
		.slice(i, i + chunkSize)
		.join(' ')
		// Replace newlines with spaces
		.replace(/[\r\n]+/g, ' ')
		// Replace multiple dots with a space
		.replace(/\.{2,}/g, ' ')
		// Replace multiple spaces/tabs with a single space
		.replace(/[ \t]+/g, ' ')
		// Optionally, trim leading/trailing spaces
		.trim();
	chunks.push(chunk);
}

// Save chunks
fs.writeFileSync('./chunks.json', JSON.stringify(chunks, null, 2));
