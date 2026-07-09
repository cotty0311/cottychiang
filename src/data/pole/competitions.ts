const MEDIA_BASE_URL = 'https://media.cottychiang.com';
const COMPETITION_PHOTO_BASE = `${MEDIA_BASE_URL}/photos/pole/competition`;

const pso2025Photos = [
	'107B - Cotty - 2025 Taiwan - 0135.jpg',
	'107B - Cotty - 2025 Taiwan - 0159.jpg',
	'107B - Cotty - 2025 Taiwan - 0271.jpg',
	'107B - Cotty - 2025 Taiwan - 0331.jpg',
	'107B - Cotty - 2025 Taiwan - 0433.jpg',
	'107B - Cotty - 2025 Taiwan - 0481.jpg',
	'107B - Cotty - 2025 Taiwan - 0507.jpg',
	'107B - Cotty - 2025 Taiwan - 0537.jpg',
	'107B - Cotty - 2025 Taiwan - 0577.jpg',
	'107B - Cotty - 2025 Taiwan - 0601.jpg',
	'107B - Cotty - 2025 Taiwan - 0710.jpg',
	'107B - Cotty - 2025 Taiwan - 0791.jpg',
	'107B - Cotty - 2025 Taiwan - 0838.jpg',
	'107B - Cotty - 2025 Taiwan - 0865.jpg',
	'107B - Cotty - 2025 Taiwan - 0945.jpg',
	'107B - Cotty - 2025 Taiwan - 0976.jpg',
	'107B - Cotty - 2025 Taiwan - 1072.jpg',
	'107B - Cotty - 2025 Taiwan - 1107.jpg',
	'107B - Cotty - 2025 Taiwan - 1154.jpg',
	'107B - Cotty - 2025 Taiwan - 1229.jpg',
];

const pso2026Photos = [
	'109D - Cotty - 2026 Taiwan - 0030.jpg',
	'109D - Cotty - 2026 Taiwan - 0128.jpg',
	'109D - Cotty - 2026 Taiwan - 0176.jpg',
	'109D - Cotty - 2026 Taiwan - 0256.jpg',
	'109D - Cotty - 2026 Taiwan - 0260.jpg',
	'109D - Cotty - 2026 Taiwan - 0542.jpg',
	'109D - Cotty - 2026 Taiwan - 0564.jpg',
	'109D - Cotty - 2026 Taiwan - 0627.jpg',
	'109D - Cotty - 2026 Taiwan - 0637.jpg',
	'109D - Cotty - 2026 Taiwan - 0647.jpg',
	'109D - Cotty - 2026 Taiwan - 0834.jpg',
	'109D - Cotty - 2026 Taiwan - 1016.jpg',
	'109D - Cotty - 2026 Taiwan - 1078.jpg',
	'109D - Cotty - 2026 Taiwan - 1079.jpg',
	'109D - Cotty - 2026 Taiwan - 1080 - Blurry.jpg',
	'109D - Cotty - 2026 Taiwan - 1081.jpg',
	'109D - Cotty - 2026 Taiwan - 1133.jpg',
	'109D - Cotty - 2026 Taiwan - 1183.jpg',
	'109D - Cotty - 2026 Taiwan - 1382.jpg',
	'109D - Cotty - 2026 Taiwan - 1390.jpg',
	'109D - Cotty - 2026 Taiwan - 1437.jpg',
	'109D - Cotty - 2026 Taiwan - 1515.jpg',
	'109D - Cotty - 2026 Taiwan - 1525.jpg',
	'109D - Cotty - 2026 Taiwan - 1622.jpg',
];

const pso2025Featured = ['0159', '0271', '0433', '0537', '0945', '1154'];
const pso2026Featured = ['0128', '0542', '0627', '1437', '1525', '1622'];

function buildPhoto(id: string, file: string) {
	return {
		file,
		src: `${COMPETITION_PHOTO_BASE}/${id}/${encodeURIComponent(file)}`,
		alt: `${id} competition photo`,
	};
}

function selectFeatured(photos: ReturnType<typeof buildPhoto>[], featuredIds: string[]) {
	return featuredIds
		.map((featuredId) => photos.find((photo) => photo.file.includes(`- ${featuredId}.jpg`)))
		.filter((photo): photo is ReturnType<typeof buildPhoto> => Boolean(photo));
}

export const competitions = [
	{
		id: 'pso2025',
		name: 'PSO 2025',
		date: '2025.03.29',
		place: '臺灣圖書館',
		rank: '4/11',
		videoUrl: 'https://www.youtube.com/embed/I5i0YMBCo5I',
		reflection: '第一次，很有趣。',
		medal: null,
		photos: pso2025Photos.map((file) => buildPhoto('pso2025', file)),
		featuredPhotoIds: pso2025Featured,
		expenses: [
			{ category: '私人課', amount: 11200, color: '#d94f30' },
			{ category: '治裝費', amount: 5124, color: '#2f6f73' },
			{ category: '娛樂費', amount: 320, color: '#e5b742' },
			{ category: '租管', amount: 6740, color: '#6b5bbd' },
			{ category: '報名費', amount: 7666, color: '#cc6f98' },
			{ category: '維修費', amount: 5300, color: '#557a2f' },
		],
	},
	{
		id: 'pso2026',
		name: 'PSO 2026',
		date: '2026.03.07',
		place: '臺灣戲曲學院',
		rank: '3/4',
		videoUrl: 'https://www.youtube.com/embed/LUEY74s_6nA',
		reflection: '第二次，很好玩。',
		medal: 'bronze',
		photos: pso2026Photos.map((file) => buildPhoto('pso2026', file)),
		featuredPhotoIds: pso2026Featured,
		expenses: [
			{ category: '私人課', amount: 16000, color: '#d94f30' },
			{ category: '租管', amount: 11675, color: '#2f6f73' },
			{ category: '報名費', amount: 8840, color: '#6b5bbd' },
			{ category: '治裝費', amount: 3450, color: '#cc6f98' },
			{ category: '道具費', amount: 1525, color: '#e5b742' },
			{ category: '鋼管週邊', amount: 453, color: '#557a2f' },
			{ category: '交通費', amount: 230, color: '#7a6251' },
		],
	},
].map((competition) => ({
	...competition,
	featuredPhotos: selectFeatured(competition.photos, competition.featuredPhotoIds),
}));
