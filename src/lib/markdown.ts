import { marked } from 'marked';

function escapeAttribute(value: string) {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#39;');
}

function safeUrl(value: string, image = false) {
	const url = value.trim();
	const compact = url.replace(/[\u0000-\u0020\u007f]+/g, '');
	const relative = /^(?:[./]|#)/.test(compact);
	const permittedScheme = image ? /^https?:/i.test(compact) : /^(?:https?:|mailto:)/i.test(compact);
	return relative || permittedScheme ? url : null;
}

marked.use({
	gfm: true,
	breaks: true,
	renderer: {
		// Practice notes never need executable HTML. Dropping it keeps Markdown safe
		// without pulling Node-only sanitizers into Cloudflare's prerender runtime.
		html() {
			return '';
		},
		link({ href, title, tokens }) {
			const url = safeUrl(href);
			const label = this.parser.parseInline(tokens);
			if (!url) return label;
			const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : '';
			return `<a href="${escapeAttribute(url)}"${titleAttribute} target="_blank" rel="noreferrer noopener">${label}</a>`;
		},
		image({ href, title, text }) {
			const url = safeUrl(href, true);
			if (!url) return escapeAttribute(text);
			const titleAttribute = title ? ` title="${escapeAttribute(title)}"` : '';
			return `<img src="${escapeAttribute(url)}" alt="${escapeAttribute(text)}"${titleAttribute} loading="lazy">`;
		},
	},
});

export function renderMarkdown(value: string) {
	return marked.parse(value || '', { async: false }) as string;
}
