import { Button } from '@/components/ui/button';
import CarouselWrapper from '../highlithedCities/CarouselWrapper';
import { getCoworkingsAmountByCity } from '@/services/getCoworkingsAmountByCity';
import { getTotalCitiesAndCoworkings } from '@/services/getTotalCitiesAndCoworkings';

const HighlightedCities = async () => {
    const { coworksByCities } = await getCoworkingsAmountByCity();
    const { totalCoworkings, totalDistinctCities } =
        await getTotalCitiesAndCoworkings();

    return (
        <section className='my-[5vh] flex flex-col gap-8 overflow-x-hidden px-4 lg:my-20'>
            <div className='flex flex-col gap-8 lg:flex-row lg:justify-between '>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-2xl font-bold'>
                        Déjà {totalCoworkings} lieux référencés dans{' '}
                        {totalDistinctCities} villes
                    </h2>
                    <h3 className='text-base text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
                        Tous les jours, nous partons à la conquête de de
                        nouveaux lieux pour vous proposer une nouvelle manière
                        de travailler.
                    </h3>
                </div>
                <Button
                    variant={'default'}
                    size={'sm'}
                    className='w-full lg:h-12 lg:w-[320px] lg:px-4'
                >
                    <span>Découvrez une nouvelle ville</span>
                </Button>
            </div>
            <CarouselWrapper coworksByCities={coworksByCities} />
        </section>
    );
};

export default HighlightedCities;
