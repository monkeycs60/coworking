import Assets from '@/components/home/sections/Assets';
import Hero from '@/components/home/sections/Hero';
import HighlightedCoworkings from '@/components/home/sections/HighlightedCoworkings';
import HowTo from '@/components/home/sections/HowTo';
import HighlightedCities from '@/components/home/sections/HighlightedCities';
import Faq from '@/components/home/sections/Faq';
import Contact from '@/components/home/sections/Contact';
import LastCoworkings from '@/components/home/sections/LastCoworkings';

export default function Home() {
    return (
        <>
            <Hero />
            <LastCoworkings />
            <div className='h-[200vh] '>
                <h1>hello les gens</h1>
            </div>
            {/* <HighlightedCoworkings />
            <Assets />
            <HowTo />
            <HighlightedCities />
            <Faq />
            <Contact /> */}
        </>
    );
}
