import * as pdfParse from 'pdf-parse/lib/pdf-parse.js';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

(async () => {
	const file = fs.readFileSync('./harry_potter.pdf');
	const rawText = await pdfParse.default(file);
	fs.writeFileSync('./harry_potter.txt', rawText.text);
})();
