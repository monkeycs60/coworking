import Map from '@/components/explore/Map';
import { getAppStatistics } from '@/services/getAppStatistics';
import { centerOfFrance } from '@/lib/const/centerOfFrance';
import getCoworkingsCoords from '@/lib/functions/getCoworkingsCoords';
import { Coworking } from '@/types/coworking';
import { Redo2, Info } from 'lucide-react';

const page = async () => {
    const {
        allCoworkings,
        totalImages,
        totalReviews,
        uniqueCities,
        totalUsers,
    } = await getAppStatistics();

    const coworkingLocations = getCoworkingsCoords(allCoworkings);

    return (
        <section className='mt-4 min-h-[800px] rounded-xl bg-gray-50 p-6 lg:mt-32 lg:p-10 xl:mt-16 3xl:mt-64'>
            <div className='flex flex-col gap-8 lg:gap-12'>
                <div className='flex flex-col gap-5'>
                    <h1 className='font-signatra text-3xl'>Coworkez Malin </h1>
                    <div className='flex gap-6 lg:items-center lg:gap-8 lg:pl-6'>
                        <Redo2 className='h-10 w-10 lg:h-8 lg:w-8' />
                        <p>
                            C'est{' '}
                            <span className='font-bold'>
                                {' '}
                                {totalUsers}{' '}
                                <span className='hidden lg:inline'>
                                    {' '}
                                    utilisateurs
                                </span>{' '}
                            </span>{' '}
                            🙋‍♂️ qui ont écrit{' '}
                            <span className='font-bold'>
                                {totalReviews}{' '}
                                <span className='hidden lg:inline'> avis</span>
                            </span>{' '}
                            📜 et qui ont partagé
                            <span className='font-bold'>
                                {' '}
                                {totalImages}{' '}
                                <span className='hidden lg:inline'>photos</span>{' '}
                                📸
                            </span>
                            .
                        </p>
                    </div>
                    <div className='flex gap-6 lg:items-center lg:gap-8 lg:pl-6'>
                        <Redo2 className='h-10 w-10 lg:h-8 lg:w-8' />
                        <p>
                            C'est aussi{' '}
                            <span className='font-bold'>
                                {allCoworkings.length}{' '}
                                <span className='hidden lg:inline'>
                                    espaces
                                </span>
                            </span>{' '}
                            🏢 où coworker gratuitement dans{' '}
                            <span className='font-bold'>
                                {' '}
                                {uniqueCities}{' '}
                                <span className='hidden lg:inline'>villes</span>
                            </span>{' '}
                            🌃 différentes.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col gap-2 lg:gap-4'>
                    <div className='flex items-center justify-center gap-6 text-sm'>
                        <Info />
                        <p className=' text-center'>
                            Tous nos espaces sont référencés sur la carte
                            ci-dessous
                        </p>
                    </div>
                    <Map
                        height='700px'
                        width='100%'
                        centerOfMap={centerOfFrance}
                        coworkingLocations={coworkingLocations}
                        zoom={5}
                        coworkings={allCoworkings as unknown as Coworking[]}
                    />
                </div>
            </div>
        </section>
    );
};

export default page;
