import Assets from '@/components/home/sections/Assets';
import Hero from '@/components/home/sections/Hero';
import HighlightedCoworkings from '@/components/home/sections/HighlightedCoworkings';
import HowTo from '@/components/home/sections/HowTo';
import HighlightedCities from '@/components/home/sections/HighlightedCities';
import Faq from '@/components/home/sections/Faq';
import Contact from '@/components/home/sections/Contact';

const cs = 'clément';

export default function Home() {
    return (
        <>
            <Hero />
            <HighlightedCoworkings />
            <Assets />
            <HowTo />
            <HighlightedCities />
            <Faq />
            <Contact />
        </>
    );
}
