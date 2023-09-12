import { headers } from 'next/headers';
import { getAllCoworkingsByCity } from '@/services/getAllCoworkingsByCity';
import Map from '@/components/explore/Map';
import { getCityCenter } from '@/services/getCityCenter';
import getCoworkingsCoords from '@/lib/functions/getCoworkingsCoords';

const page = async () => {
    // const headersList = headers();
    // const activePath = headersList.get('x-invoke-path');
    // const parts = activePath ? activePath.split('/') : [];
    // const city = parts.length > 2 ? decodeURIComponent(parts[2]) : 'unknown';

    const city = "bordeaux";

    const cityCenterCoords = await getCityCenter(city);

    const coworkings = await getAllCoworkingsByCity(city);
    const coworkingLocations = getCoworkingsCoords(coworkings);
    console.log('coworkings', coworkings);

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
            <div className='flex max-h-[700px] w-full flex-wrap gap-8 overflow-y-auto bg-slate-500 p-4'>
                {coworkings.map((coworking) => (
                    <div
                        key={coworking.id}
                        className='flex h-[300px] w-[30%] flex-col items-center gap-4 bg-cover bg-center text-center'
                        style={{
                            backgroundImage: `url(${coworking.imagesSelected[0].url})`,
                        }}
                    >
                        <div className='z-50 h-[160px] w-full space-y-3 bg-slate-400/80 text-white'>
                            <p className='font-semibold'>{coworking.name}</p>
                            <p className='text-sm'>{coworking.address}</p>
                            <p className='line-clamp-4 text-sm'>
                                {coworking.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default page;
