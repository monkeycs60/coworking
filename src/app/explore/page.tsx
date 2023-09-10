import Map from '@/components/explore/Map';
import { PrismaClient } from '@prisma/client';

const page = async () => {
    const prisma = new PrismaClient();
    const coworkings = await prisma.coworking.findMany({
        select: {
            latitude: true,
            longitude: true,
            name: true,
        },
    });

    const coworkingLocations = coworkings
        .filter(
            (cowork) => cowork.latitude !== null && cowork.longitude !== null,
        )
        .map((cowork) => ({
            lat: cowork.latitude as number, // Avec la vérification ci-dessus, vous pouvez utiliser l'assertion de type ici
            lng: cowork.longitude as number, // De même ici
            name: cowork.name,
        }));

    const centerOfFrance = {
        lat: 46.603354,
        lng: 1.888334,
    };

    console.log('localisation cowork', coworkingLocations);

    return (
        <section className='mt-16 min-h-[800px] bg-gray-200 p-10 lg:mt-32 xl:mt-48 3xl:mt-64 '>
            <div className='flex flex-col gap-4'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur, esse.
                </p>
                <Map
                    centerOfFrance={centerOfFrance}
                    coworkingLocations={coworkingLocations}
                />
            </div>
        </section>
    );
};

export default page;
