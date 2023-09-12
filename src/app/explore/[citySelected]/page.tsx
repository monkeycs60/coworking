import { headers } from 'next/headers';
import { getAllCoworkingsByCity } from '@/services/getAllCoworkingsByCity';
import Map from '@/components/explore/Map';
import { getCityCenter } from '@/services/getCityCenter';
import getCoworkingsCoords from '@/lib/functions/getCoworkingsCoords';
import CoworkingCard from '@/components/explore/cards/CoworkingCard';

const page = async ({
    params: { citySelected },
}: {
    params: { citySelected: string };
}) => {
    const city = citySelected ? decodeURIComponent(citySelected) : 'unknown';

    const cityCenterCoords = await getCityCenter(city);
    const coworkings = await getAllCoworkingsByCity(city);
    const coworkingLocations = getCoworkingsCoords(coworkings);

    return (
        <section className='relative mt-16 min-h-[800px] bg-gray-200 p-10 lg:mt-32 xl:mt-48 3xl:mt-64'>
            <p> le params next js === {citySelected} !!!!!!!!!!!!!!!!!!!!!</p>
            <h1>Exploration de coworkings dans {city}</h1>
            <p>{city && <>{city}</>}</p>
            <Map
                height='700px'
                width='100%'
                centerOfMap={cityCenterCoords}
                coworkingLocations={coworkingLocations}
                zoom={12}
            />
            <div className='flex max-h-[700px] w-full flex-wrap gap-8 overflow-y-auto bg-slate-500 p-4'>
                {coworkings.map((coworking) => (
                    <CoworkingCard coworking={coworking} key={coworking.id} />
                ))}
            </div>
        </section>
    );
};

export default page;
