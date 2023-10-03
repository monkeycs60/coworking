import { getAllCoworkingsByCity } from '@/services/getAllCoworkingsByCity';
import { getCityCenter } from '@/services/getCityCenter';
import getCoworkingsCoords from '@/lib/functions/getCoworkingsCoords';
import DisplayFilteredCoworking from '@/components/explore/citySelected/DisplayFilteredCoworking';
import { Coworking } from '@/types/coworking';

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
        <section className='mt-4 min-h-[800px] rounded-xl bg-gray-50 p-6 lg:mt-16 lg:p-10'>
            <DisplayFilteredCoworking
                citySelected={citySelected}
                cityCenterCoords={cityCenterCoords}
                coworkingLocations={coworkingLocations}
                city={city}
                coworkings={coworkings as unknown as Coworking[]}
            />
        </section>
    );
};

export default page;
