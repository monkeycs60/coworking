import React from 'react'
import Image from 'next/image';
import { Euro } from 'lucide-react';
import { establishmentsConverter } from '@/lib/functions/establishmentsConverter';
import { LastCoworking } from '@/types/lastCoworking';
import { averageRatingFromReviews } from '@/lib/functions/averageRatingFromReviews';


const LastCoworkingCard = (
    { coworking }: { coworking: LastCoworking }) => {
    const coworkingAverageRating = averageRatingFromReviews(coworking.reviews);

    return (
        <div className="rounded-2xl bg-secondary text-sm">
            <Image src={coworking.imageSelectedUrls[0].url} alt={coworking.name} width={400} height={300} className="h-[200px] w-full rounded-t-2xl object-cover" />
            <div className="flex justify-between gap-2 p-4">
                <div className="flex w-2/3 flex-col justify-between 3xl:w-3/4">
                    <h3 className="line-clamp-1 font-bold">{coworking.name}</h3>
                    <p> {coworking.city} </p>
                </div>
                <div className="flex w-1/3 flex-col justify-between 3xl:w-1/4">
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
    )
}

export default LastCoworkingCard