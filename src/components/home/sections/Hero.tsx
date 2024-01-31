import Image from 'next/image';
import { MapPin } from 'lucide-react';
import clsx from 'clsx';
import { cityList } from '@/services/cityList';
import CityInput from '../ui/CityInput';
import CitySearchButton from '../ui/CitySearchButton';

const Hero = async () => {
    const cities = await cityList();

    return (
        <section >
          
        </section>
    );
};

export default Hero;
