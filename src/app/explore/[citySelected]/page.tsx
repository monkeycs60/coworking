import { getAllCoworkingsByCity } from '@/services/getAllCoworkingsByCity';
import Map from '@/components/explore/Map';
import { getCityCenter } from '@/services/getCityCenter';
import getCoworkingsCoords from '@/lib/functions/getCoworkingsCoords';
import CoworkingCard from '@/components/explore/cards/CoworkingCard';
import SideBarFilter from '@/components/layout/SideBarFilter';

const page = async ({
    params: { citySelected },
}: {
    params: { citySelected: string };
}) => {
    const city = citySelected ? decodeURIComponent(citySelected) : 'unknown';

    const cityCenterCoords = await getCityCenter(city);
    const coworkings = await getAllCoworkingsByCity(city);
    console.log(coworkings);
    const coworkingLocations = getCoworkingsCoords(coworkings);

    return (
        <section className='mt-4 min-h-[800px] rounded-xl bg-gray-50 p-6 lg:mt-16 lg:p-10'>
            <div className='flex flex-col gap-8 lg:gap-12'>
                <h1 className='font-signatra text-3xl'>{citySelected}</h1>
                <div className='relative flex w-full flex-col gap-[20px] lg:flex-row'>
                    <SideBarFilter />
                    <div className='relative hidden h-[400px] w-full  lg:block lg:h-[700px] lg:w-[72%]'>
                        <Map
                            height='700px'
                            width='100%'
                            centerOfMap={cityCenterCoords}
                            coworkingLocations={coworkingLocations}
                            zoom={12}
                            coworkings={coworkings}
                        />
                    </div>
                </div>
                <div className='flex w-full flex-wrap justify-between gap-8 p-4'>
                    {coworkings.map((coworking) => (
                        <CoworkingCard
                            city={city}
                            coworking={coworking}
                            key={coworking.id}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default page;
