export type CsvRow = Record<string, string>;

export function readCsv(textInput: string): CsvRow[] {
	const text = textInput.replace(/^\uFEFF/, '');
	const rows = parseCsv(text);
	const [headers, ...body] = rows;

	if (!headers) {
		return [];
	}

	return body
		.filter((row) => row.some((cell) => cell.trim() !== ''))
		.map((row) =>
			Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ''])),
		);
}

function parseCsv(input: string): string[][] {
	const rows: string[][] = [];
	let row: string[] = [];
	let cell = '';
	let inQuotes = false;

	for (let index = 0; index < input.length; index += 1) {
		const char = input[index];
		const next = input[index + 1];

		if (char === '"') {
			if (inQuotes && next === '"') {
				cell += '"';
				index += 1;
			} else {
				inQuotes = !inQuotes;
			}
			continue;
		}

		if (char === ',' && !inQuotes) {
			row.push(cell);
			cell = '';
			continue;
		}

		if ((char === '\n' || char === '\r') && !inQuotes) {
			if (char === '\r' && next === '\n') {
				index += 1;
			}
			row.push(cell);
			rows.push(row);
			row = [];
			cell = '';
			continue;
		}

		cell += char;
	}

	if (cell.length > 0 || row.length > 0) {
		row.push(cell);
		rows.push(row);
	}

	return rows;
}
