import Map from '@/components/explore/Map';
import { getAllCoworkings } from '@/services/getAllCoworkings';
import { centerOfFrance } from '@/lib/const/centerOfFrance';
import getCoworkingsCoords from '@/lib/functions/getCoworkingsCoords';
import { Coworking } from '@/types/coworking';
import { Info } from 'lucide-react';
import StatsPannel from '@/components/explore/StatsPannel';

const page = async () => {
    const coworkings = await getAllCoworkings();
    const coworkingLocations = getCoworkingsCoords(coworkings);

    return (
        <section className='mt-4 min-h-[800px] rounded-xl bg-gray-50 p-6 lg:mt-32 lg:p-10 xl:mt-16 3xl:mt-64'>
            <div className='flex flex-col gap-8 lg:gap-12'>
                <StatsPannel />
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
                        coworkings={coworkings as unknown as Coworking[]}
                    />
                </div>
            </div>
        </section>
    );
};

export default page;
