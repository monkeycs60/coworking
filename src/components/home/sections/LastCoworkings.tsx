import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Carousel";
import { getLatestCoworkings } from "@/services/getLatestCoworkings";
import Image from "next/image";
import { averageRatingFromReviews } from "@/lib/functions/averageRatingFromReviews";
import { Euro } from 'lucide-react';
import { Button } from "@/components/ui/button";


const establishmentsConverter = (establishmentType: string) => {
    switch (establishmentType) {
        case 'HOTEL_LOBBY':
            return 'Lobby d\'hôtel';
        case 'CAFE':
            return 'Café';
        case 'RESTAURANT_BAR':
            return 'Restaurant / Bar';
        case 'THIRD_PLACE':
            return 'Tiers-lieu';
        case 'LIBRARY':
            return 'Bibliothèque';
        case 'OTHER':
            return 'Autre';
        default:
            return 'Autre';
    }
}



const LastCoworkings = async () => {
    const lastCoworkings = await getLatestCoworkings();
    console.log('lastCoworkings', lastCoworkings);



    return (
        <div className="m-auto w-3/4 text-black">
            <h2 className="py-12 text-center text-xl font-bold 3xl:text-2xl">Découvrir les derniers lieux ajoutés par la communauté</h2>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {
                        lastCoworkings.map((coworking, index) => {
                            const coworkingAverageRating = averageRatingFromReviews(coworking.reviews);
                            return (
                                <CarouselItem key={index} className="relative md:basis-1/3 3xl:basis-1/4">
                                    <div className="rounded-2xl bg-secondary">
                                        <Image src={coworking.imageSelectedUrls[0].url} alt={coworking.name} width={400} height={300} className="h-[300px] w-full rounded-t-2xl object-cover" />
                                        <div className="flex justify-between gap-2 p-4">
                                            <div className="flex w-2/3 flex-col justify-between">
                                                <h3 className="line-clamp-1 font-bold">{coworking.name}</h3>
                                                <p> {coworking.city} </p>
                                            </div>
                                            <div className="flex w-1/3 flex-col justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Image src="/images/plain-star.svg" alt="euro" width={20} height={20} />
                                                    <p className="font-bold">
                                                        {coworkingAverageRating}
                                                    </p>
                                                    <p>(
                                                        {coworking.reviews.length})
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Image src="/images/coffee.svg" alt="euro" width={20} height={20} />
                                                    <div className="flex">
                                                        {coworking.espressoPrice && +coworking.espressoPrice <= 1.5 ? (
                                                            <>
                                                                <Euro className='h-4 w-4 text-black' />
                                                                <Euro className='h-4 w-4 text-gray-300' />
                                                                <Euro className='h-4 w-4 text-gray-300' />
                                                            </>
                                                        ) : coworking.espressoPrice && +coworking.espressoPrice <= 2.5 ? (
                                                            <>
                                                                <Euro className='h-4 w-4 text-black' />
                                                                <Euro className='h-4 w-4 text-black' />
                                                                <Euro className='h-4 w-4 text-gray-300' />
                                                            </>
                                                        ) : coworking.espressoPrice && +coworking.espressoPrice > 2.5 ? (
                                                            <>
                                                                <Euro className='h-4 w-4 text-black' />
                                                                <Euro className='h-4 w-4 text-black' />
                                                                <Euro className='h-4 w-4 text-black' />
                                                            </>
                                                        ) :
                                                            (
                                                                <p>Indisponible</p>
                                                            )
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-4 py-2">
                                            <p> <span className="font-semibold"> {coworking.establishmentType ? establishmentsConverter(coworking.establishmentType) : 'Autre'}</span> ajouté par <span className="font-semibold"> {coworking.user.username || coworking.user.email}</span> </p>
                                        </div>
                                    </div>

                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="mt-16 flex flex-col items-center justify-center gap-6 3xl:mt-20">
                <p className="font-semibold">Partage dès maintenant tes spots préférés !</p>
                <Button variant="default" className="px-24 py-6 font-semibold 3xl:px-32 3xl:py-8 3xl:text-lg">
                    Ajouter un nouveau lieu
                </Button>
            </div >
        </div >
    )
}

export default LastCoworkings