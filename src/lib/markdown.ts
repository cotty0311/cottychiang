import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

marked.use({
	gfm: true,
	breaks: true,
});

const allowedTags = [
	'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'strong', 'em', 's', 'ul', 'ol', 'li',
	'blockquote', 'a', 'code', 'pre', 'hr', 'img', 'br', 'input',
];

export function renderMarkdown(value: string) {
	const rendered = marked.parse(value || '', { async: false }) as string;

	return sanitizeHtml(rendered, {
		allowedTags,
		allowedAttributes: {
			a: ['href', 'title'],
			img: ['src', 'alt', 'title', 'width', 'height'],
			input: ['type', 'checked', 'disabled'],
			code: ['class'],
		},
		allowedSchemes: ['http', 'https', 'mailto'],
		allowedSchemesByTag: { img: ['http', 'https'] },
		transformTags: {
			a: sanitizeHtml.simpleTransform('a', { target: '_blank', rel: 'noreferrer noopener' }),
			input: (_tagName, attribs) => ({
				tagName: 'input',
				attribs: { type: 'checkbox', disabled: '', ...(attribs.checked !== undefined ? { checked: '' } : {}) },
			}),
		},
		disallowedTagsMode: 'discard',
		enforceHtmlBoundary: true,
	});
}
