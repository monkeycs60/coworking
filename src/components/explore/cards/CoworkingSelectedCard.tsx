import Map from '@/components/explore/Map';
import Image from 'next/image';
import { Coworking } from '@/types/coworking';
import Characteristics from './CoworkingSelectedCard/Characteristics';
import Review from './CoworkingSelectedCard/Review';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from '@/components/ui/table';

const CoworkingSelectedCard = ({ coworking }: { coworking: Coworking }) => {
    const defaultImage = '/cowork-placeholder.jpg';
    const coworkingCenter = {
        lat: coworking?.latitude as number,
        lng: coworking?.longitude as number,
    };
    const coworkingLocation = {
        lat: coworking?.latitude as number,
        lng: coworking?.longitude as number,
        name: coworking?.name as string,
    };
    console.log(coworking.openingHours);
    const weekdays = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];
    const hoursToDisplay =
        coworking.openingHours && coworking.openingHours[0]
            ? coworking.openingHours[0].weekdayText.map(
                  (hour) => hour || "Pas d'info",
              )
            : new Array(7).fill("Pas d'info"); // Fills array with "Pas d'info" as placeholders

    return (
        <div className='my-16 flex flex-col gap-10'>
            <div className='font flex justify-between'>
                <p className='font-inter text-4xl font-semibold'>
                    {coworking?.name}
                </p>
                <div className='flex flex-col items-end text-lg'>
                    <p>{coworking?.address}</p>
                    <p>{coworking?.phoneNumber}</p>
                </div>
            </div>
            <div>
                <div className='flex h-[440px] items-center justify-center gap-12 bg-gray-400'>
                    <div className='relative h-[400px] w-[45%] '>
                        <Image
                            src={
                                coworking?.userImages?.[0]?.url || defaultImage
                            }
                            fill
                            className='object-cover'
                            alt={'coucou'}
                        />
                    </div>
                    <div className='flex h-[400px] w-[45%] flex-col gap-4'>
                        <div className='relative h-[200px] w-full'>
                            <Image
                                src={
                                    coworking?.imagesSelected?.[0]?.url ||
                                    defaultImage
                                }
                                fill
                                className='object-cover'
                                alt={'hello'}
                            />
                        </div>
                        <div className='relative h-[200px] w-full'>
                            <Image
                                src={
                                    coworking?.imagesSelected?.[1]?.url ||
                                    defaultImage
                                }
                                fill
                                className='object-cover'
                                alt={'hello'}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p>{coworking?.description}</p>
            </div>
            <Characteristics coworking={coworking} />
            <div className='flex flex-wrap gap-8'>
                {coworking.reviews.map((review) => (
                    <Review
                        key={review.id}
                        review={review}
                        defaultImage={defaultImage}
                    />
                ))}
            </div>
            <div className='flex items-center justify-between'>
                <div className='my-8'>
                    <Table className='h-[300px] w-[400px]'>
                        <TableCaption>Horaires ouverture</TableCaption>
                        <TableBody>
                            {weekdays.map((day, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className='font-medium'>
                                        {day}
                                    </TableCell>
                                    <TableCell>{hoursToDisplay[idx]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Map
                    centerOfMap={coworkingCenter}
                    coworkingLocations={[coworkingLocation]}
                    zoom={14}
                    height='300px'
                    width='500px'
                    key={coworking.id}
                />
            </div>
        </div>
    );
};

export default CoworkingSelectedCard;
