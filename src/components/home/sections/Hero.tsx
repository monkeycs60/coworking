import Image from 'next/image';
import { cityList } from '@/services/cityList';
import CityInput from '../ui/CityInput';
import { getAppStatistics } from '@/services/getAppStatistics';
import Link from 'next/link';

const Hero = async () => {
    const cities = await cityList();
    const { totalUsers, totalCoworkings, totalCities } = await getAppStatistics();
    return (
        <section className='hero-bg h-screen pt-[80px] 3xl:pt-[100px] '>
            <div>
                <div className='flex flex-col items-center justify-center pt-28 tracking-wider xl:pt-52 3xl:pt-64'>
                    <h1 className='text-center text-5xl font-bold lg:text-start lg:text-6xl 3xl:text-8xl'>Coworker sans se ruiner</h1>
                    <h2 className='hidden text-xl lg:block 3xl:text-3xl'>Rencontrer de nouvelles personnes, découvrir de nouveaux lieux </h2>
                </div>
                <CityInput cities={cities} />
                <Link href={"/hello"} className='m-auto flex items-center gap-4 px-2 pt-3 font-semibold lg:w-[55%] lg:justify-end 3xl:pt-6'>
                    <div className='rounded-full border-[1px] border-white p-2'>
                        <Image src='/images/proximity.svg' alt='proximity icon' width={13} height={14} className='h-5 w-5 rounded-full' />
                    </div>
                    <p className='linkHoverEffect 3xl:text-lg'>Trouver les lieux les plus proches de vous</p>
                </Link>
                <div className='m-auto mt-20 flex w-full flex-col items-center justify-center gap-[2px] text-lg lg:text-lg 3xl:mt-32 3xl:text-2xl'>
                    <h3 className='mb-2'><span className='text-lg font-bold italic lg:text-xl 3xl:text-3xl'>Coworkez Malin</span>, c’est une communauté de :</h3>
                    <p><span className='pr-2'>🧑</span>{totalUsers} utilisateurs qui ont partagé</p>
                    <p><span className='pr-2'>🍩</span>{totalCoworkings} lieux où coworker gratuitement</p>
                    <p><span className='pr-2'>🌍</span>dans {totalCities} villes différentes</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
