import Assets from '@/components/home/sections/Assets';
import Hero from '@/components/home/sections/Hero';
import HighlightedCoworkings from '@/components/home/sections/HighlightedCoworkings';
import HowTo from '@/components/home/sections/HowTo';

export default function Home() {
	return (
		<>
			<Hero />
			<HighlightedCoworkings />
			<Assets />
			<HowTo />
		</>
	);
}
