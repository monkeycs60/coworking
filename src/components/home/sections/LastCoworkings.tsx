import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/Carousel";
import { getLatestCoworkings } from "@/services/getLatestCoworkings";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LastCoworkingCard from "../cards/LastCoworkingCard";

const LastCoworkings = async () => {
    const lastCoworkings = await getLatestCoworkings();

    return (
        <div className="m-auto w-3/4 text-black">
            <h2 className="py-16 text-center text-2xl font-bold">Découvrir les derniers lieux ajoutés par la communauté</h2>
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full"
            >
                <CarouselContent>
                    {
                        lastCoworkings.map((coworking, index) => {
                            return (
                                <CarouselItem key={index} className="relative md:basis-1/3 3xl:basis-1/4">
                                    <LastCoworkingCard coworking={coworking} />
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <div className="mt-12 flex flex-col items-center justify-center gap-6 3xl:mt-20">
                <p className="font-semibold">Partage dès maintenant tes spots préférés !</p>
                <Button variant="default" className="px-24 py-6 font-semibold 3xl:px-32 3xl:py-8 3xl:text-lg">
                    <Link href="/ajouter-lieu">
                        Ajouter un nouveau lieu
                    </Link>
                </Button >
            </div >
        </div >
    )
}

export default LastCoworkings