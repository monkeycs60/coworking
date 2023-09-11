import Map from '@/components/explore/Map';
import { PrismaClient } from '@prisma/client';
import { centerOfFrance } from '@/lib/const/centerOfFrance';
import getCoworkingsCoords from '@/lib/functions/getCoworkingsCoords';

const page = async () => {
    const prisma = new PrismaClient();
    const coworkings = await prisma.coworking.findMany({
        select: {
            latitude: true,
            longitude: true,
            name: true,
        },
    });

    const coworkingLocations = getCoworkingsCoords(coworkings);

    return (
        <section className='mt-16 min-h-[800px] bg-gray-200 p-10 lg:mt-32 xl:mt-48 3xl:mt-64 '>
            <div className='flex flex-col gap-4'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur, esse.
                </p>
                <Map
                    centerOfMap={centerOfFrance}
                    coworkingLocations={coworkingLocations}
                    zoom={5}
                />
            </div>
        </section>
    );
};

export default page;
