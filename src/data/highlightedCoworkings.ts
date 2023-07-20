interface highlightedCoworkingsProps {
    id: number;
    name: string;
    slug: string;
    location: string;
    illustration: string;
    url: string;
    comfortScore: number;
    calmScore: number;
    wifiScore: number;
}

export const highlightedCoworkings: highlightedCoworkingsProps[] = [
	{
		id: 1,
		name: 'Moxy',
		slug: 'moxy',
		location: '25 quai du Maroc, 33000, Bordeaux',
		illustration: '/coworking-photos/moxy.jpg',
		url: `/coworking/moxy`,
		comfortScore: 4,
		calmScore: 4,
		wifiScore: 4,
	},
	{
		id: 2,
		name: 'Novotel Centre',
		slug: 'novotel-centre',
		location: '52 avenue du Général Leclerc, 33008, Bordeaux',
		illustration: '/coworking-photos/novotel.webp',
		url: '/coworking/novotel-centre',
		comfortScore: 5,
		calmScore: 2,
		wifiScore: 5,
	},
	{
		id: 3,
		name: 'Ibis Styles',
		slug: 'ibis-styles',
		location: '54 Rue Marcel Tribut, 37000, Tours',
		illustration: '/coworking-photos/cowork1.jpg',
		url: '/coworking/ibis-styles',
		comfortScore: 4,
		calmScore: 3,
		wifiScore: 4,
	},
	{
		id: 4,
		name: 'Urban Station',
		slug: 'urban-station',
		location: '20 Rue Saint-Denis, 75002, Paris',
		illustration: '/coworking-photos/cowork2.jpg',
		url: '/coworking/urban-station',
		comfortScore: 5,
		calmScore: 4,
		wifiScore: 5,
	},
	{
		id: 5,
		name: 'The Hoxton',
		slug: 'the-hoxton',
		location: '32 Rue du Sentier, 75002, Paris',
		illustration: '/coworking-photos/cowork3.jpg',
		url: '/coworking/the-hoxton',
		comfortScore: 5,
		calmScore: 5,
		wifiScore: 4,
	},
	{
		id: 6,
		name: 'WeWork',
		slug: 'we-work',
		location: '123 Boulevard de Grenelle, 75015, Paris',
		illustration: '/coworking-photos/cowork4.jpg',
		url: '/coworking/we-work',
		comfortScore: 4,
		calmScore: 3,
		wifiScore: 5,
	},
	{
		id: 7,
		name: 'Spaces',
		slug: 'spaces',
		location: '7 Rue de la Bourse, 31000, Toulouse',
		illustration: '/coworking-photos/cowork5.jpg',
		url: '/coworking/spaces',
		comfortScore: 4,
		calmScore: 4,
		wifiScore: 5,
	},
	{
		id: 8,
		name: 'Regus',
		slug: 'regus',
		location: '18 Boulevard de la Prairie, 44100, Nantes',
		illustration: '/coworking-photos/cowork6.webp',
		url: '/coworking/regus',
		comfortScore: 5,
		calmScore: 4,
		wifiScore: 5,
	},
	{
		id: 9,
		name: 'TechLoft',
		slug: 'techloft',
		location: '58 Rue du Dessous des Berges, 75013, Paris',
		illustration: '/coworking-photos/cowork8.jpg',
		url: '/coworking/techloft',
		comfortScore: 4,
		calmScore: 5,
		wifiScore: 5,
	},
	{
		id: 10,
		name: 'Buro Club',
		slug: 'buro-club',
		location: '40 Rue du Bignon, 35135, Chantepie',
		illustration: '/coworking-photos/cowork9.jpg',
		url: '/coworking/buro-club',
		comfortScore: 5,
		calmScore: 5,
		wifiScore: 5,
	},
];