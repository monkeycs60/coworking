import { getAppStatistics } from '@/services/getAppStatistics';
import { Redo2 } from 'lucide-react';

const StatsPannel = async () => {
    const {
        allCoworkings,
        totalImages,
        totalReviews,
        uniqueCities,
        totalUsers,
    } = await getAppStatistics();
    return (
        <div className='flex flex-col gap-5'>
            <h1 className='font-signatra text-3xl'>Coworkez Malin </h1>
            <div className='flex gap-6 lg:items-center lg:gap-8 lg:pl-6'>
                <Redo2 className='h-10 w-10 lg:h-8 lg:w-8' />
                <p>
                    C'est{' '}
                    <span className='font-bold'>
                        {' '}
                        {totalUsers}{' '}
                        <span className='hidden lg:inline'> utilisateurs</span>{' '}
                    </span>{' '}
                    🙋‍♂️🙋‍♀️ qui ont écrit{' '}
                    <span className='font-bold'>
                        {totalReviews}{' '}
                        <span className='hidden lg:inline'> avis</span>
                    </span>{' '}
                    📜 et qui ont partagé
                    <span className='font-bold'>
                        {' '}
                        {totalImages}{' '}
                        <span className='hidden lg:inline'>photos</span> 📸
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
                        <span className='hidden lg:inline'>espaces</span>
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
    );
};

export default StatsPannel;
