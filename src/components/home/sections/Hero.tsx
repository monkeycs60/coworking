'use client';

import Image from 'next/image';
import { MapPin } from 'lucide-react';
import clsx from 'clsx';
import { cityList } from '@/services/cityList';
import CityInput from '../ui/CityInput';
import CitySearchButton from '../ui/CitySearchButton';

const Hero = async () => {
    const cities = await cityList();

    return (
        <section className='overall-bg mb-[10vh] flex w-full flex-col justify-center lg:mb-0 lg:h-screen'>
            <div className='mt-3 flex  flex-col gap-4 sm:mt-20  sm:gap-10 lg:-mt-4 lg:flex-row  lg:gap-0 2xl:-mt-28 2xl:gap-10 3xl:-mt-20 '>
                <div className='flex flex-col px-4 lg:w-[55%] 2xl:px-16 3xl:w-[50%] 3xl:px-0'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='text-2xl font-bold leading-normal sm:text-4xl lg:text-4xl 2xl:text-5xl 3xl:leading-relaxed'>
                            Découvrez des lieux conviviaux où coworker
                            gratuitement !
                        </h2>
                        <h3 className='text-base text-gray-700 sm:text-2xl lg:w-[75%] lg:text-base 2xl:text-lg'>
                            Grâce à notre communauté, trouvez les bons plans
                            pour travailler malin dans la ville de votre choix.
                        </h3>
                    </div>
                    <div className='flex flex-col gap-3 pt-8 sm:pt-16 lg:pt-14'>
                        <form action=''>
                            <div className='relative flex flex-col items-center gap-2 sm:gap-6 lg:flex-row'>
                                <MapPin
                                    size={20}
                                    className='absolute left-4 top-3 text-gray-600 sm:top-4 sm:h-[26px] sm:w-[26px] lg:top-3 lg:h-[20px]  lg:w-[20px] 3xl:top-4 '
                                />
                                <CityInput cities={cities} />
                                <CitySearchButton />
                            </div>
                        </form>
                        <p className='text-xs text-gray-600 sm:text-base lg:text-xs 2xl:text-sm'>
                            Rencontrez de nouvelles personnes, découvrez des
                            endroits inédits
                        </p>
                    </div>
                </div>
                <div className='mt-[5vh] flex justify-center lg:mt-0 lg:w-[45%] lg:justify-end 2xl:w-1/2 2xl:items-start '>
                    <div
                        className={clsx(
                            'relative flex h-[240px] w-[300px]',
                            'sm:h-[320px] sm:w-[400px]',
                            'lg:h-[80%] lg:w-[90%] lg:justify-end',
                            '2xl:h-full 2xl:w-full',
                        )}
                    >
                        <Image
                            src='/landing-laptop-friends.webp'
                            alt='Coworkers autour d un laptop'
                            className={clsx(
                                'z-20',
                                'lg:h-[350px] lg:w-[390px]',
                                '2xl:h-[430px] 2xl:w-[470px]',
                                '3xl:h-[500px] 3xl:w-[560px]',
                            )}
                            width={600}
                            height={534}
                            priority
                        />
                        <Image
                            width={304}
                            height={297}
                            src='/Hand-drawn-arrow.svg'
                            alt='fleche jaune'
                            className='absolute -left-64 bottom-4 z-20 hidden lg:bottom-[-120px] lg:left-[-170px] lg:block lg:w-[260px] 2xl:bottom-[-80px] 2xl:left-[-150px] 2xl:w-[300px] 3xl:pointer-events-none 3xl:bottom-[-90px] 3xl:left-[-170px] 3xl:h-[300px] 3xl:w-[300px]'
                        />
                        <Image
                            width={160}
                            height={160}
                            src='/Ellipse-yellow.svg'
                            alt='cercle jaune'
                            className='absolute -right-4 -top-8 lg:-bottom-16 lg:right-0'
                        />
                        <Image
                            width={160}
                            height={160}
                            src='/Ellipse-blue.svg'
                            alt='Cercle bleu'
                            className='absolute -bottom-8 -left-4 lg:hidden'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
