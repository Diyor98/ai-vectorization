import * as pdfParse from 'pdf-parse/lib/pdf-parse.js';
import fs from 'fs';

(async () => {
	const file = fs.readFileSync('./harry_potter.pdf');
	const rawText = await pdfParse.default(file);
	fs.writeFileSync('./harry_potter.txt', rawText.text);
})();
