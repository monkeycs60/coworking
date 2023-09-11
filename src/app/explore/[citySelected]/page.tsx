import { headers } from 'next/headers';
import { getAllCoworkingsByCity } from '@/services/getAllCoworkingsByCity';
import Map from '@/components/explore/Map';
import { getCityCenter } from '@/services/getCityCenter';
import getCoworkingsCoords from '@/lib/functions/getCoworkingsCoords';

const page = async () => {
    const headersList = headers();
    const activePath = headersList.get('x-invoke-path');
    const parts = activePath ? activePath.split('/') : [];
    const city = parts.length > 2 ? decodeURIComponent(parts[2]) : 'unknown';

    const cityCenterCoords = await getCityCenter(city);

    const coworkings = await getAllCoworkingsByCity(city);
    console.log('coworkings', coworkings);
    const coworkingLocations = getCoworkingsCoords(coworkings);

    return (
        <section className='relative mt-16 min-h-[800px] bg-gray-200 p-10 lg:mt-32 xl:mt-48 3xl:mt-64'>
            <h1>Exploration de coworkings dans {city}</h1>
            <p>{city && <>{city}</>}</p>
            <Map
                height='700px'
                width='100%'
                centerOfMap={cityCenterCoords}
                coworkingLocations={coworkingLocations}
                zoom={12}
            />
            <div className='flex gap-8 bg-slate-500 p-4'>
                {coworkings.map((coworking) => (
                    <div
                        key={coworking.id}
                        className='flex h-[300px] w-1/3 flex-col items-center justify-center gap-4 bg-white p-4 text-center '
                    >
                        <p>{coworking.name}</p>
                        <p>{coworking.address}</p>
                        <p>{coworking.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default page;
