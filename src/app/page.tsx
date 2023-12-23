import Assets from '@/components/home/sections/Assets';
import Hero from '@/components/home/sections/Hero';
import HighlightedCoworkings from '@/components/home/sections/HighlightedCoworkings';
import HowTo from '@/components/home/sections/HowTo';
import HighlightedCities from '@/components/home/sections/HighlightedCities';
import Faq from '@/components/home/sections/Faq';
import Contact from '@/components/home/sections/Contact';
import SignInComponent from '@/components/auth/SignInComponent';
import SignUpComponent from '@/components/auth/SignUpComponent';

export default function Home() {
    return (
        <>
            <SignUpComponent />
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
