import { headers } from 'next/headers';
import { getAllCoworkingsByCity } from '@/services/getAllCoworkingsByCity';

const page = async () => {
    const headersList = headers();
    const activePath = headersList.get('x-invoke-path');
    const parts = activePath ? activePath.split('/') : [];
    const city = parts.length > 2 ? decodeURIComponent(parts[2]) : 'unknown';

    const coworkings = await getAllCoworkingsByCity(city);

    console.log('localisation cowork serv', coworkings);

    return (
        <section className='mt-16 min-h-[800px] bg-gray-200 p-10 lg:mt-32 xl:mt-48 3xl:mt-64 '>
            <h1>Exploration de coworkings dans {city}</h1>
            <p>{city && <>{city}</>}</p>
        </section>
    );
};

export default page;
