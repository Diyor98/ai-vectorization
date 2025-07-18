import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import fs from 'node:fs';
import dotenv from 'dotenv';

dotenv.config();

const splitter = new RecursiveCharacterTextSplitter({
	chunkSize: 300,
	chunkOverlap: 20,
});

const rawText = fs.readFileSync('./harry_potter.txt', 'utf-8');

const chunks = await splitter.splitText(rawText);

fs.writeFileSync('./chunks.json', JSON.stringify(chunks, null, 2));
