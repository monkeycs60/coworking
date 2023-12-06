'use client';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from '@/components/ui/table';
import { Coworking } from '@/types/coworking';
import { daysOfWeek } from '@/lib/const/daysOfWeek';
import { useFetchPlaceDetails } from '@/hooks/useFetchPlaceDetails';
import { PlaceDetail } from '@/types/placeDetails';
import { Circle, Ban } from 'lucide-react';

const OpeningSchedule = ({ coworking }: { coworking: Coworking }) => {
    const placeDetails = useFetchPlaceDetails(
        coworking.placeId || '',
    ) as PlaceDetail;

    const isItOpen = placeDetails?.current_opening_hours?.open_now;

    const hoursToDisplay =
        coworking.openingHours && coworking.openingHours.length > 0
            ? coworking.openingHours
            : new Array(7).fill({ openTime: "Pas d'info", closeTime: '' });

    return (
        <div className='my-8 flex w-[320px] flex-col justify-center gap-4 font-inter lg:w-[400px]'>
            <div className='flex w-full justify-between bg-slate-100 p-4'>
                <p>Statut</p>
                <div className='flex gap-2'>
                    {isItOpen ? (
                        <>
                            <p className=' text-green-500'>Ouvert</p>
                            <Circle className='text-transparent' fill='green' />
                        </>
                    ) : (
                        <>
                            <p className='text-red-500'>Fermé</p>
                            <Ban className='text-transparent' fill='red' />
                        </>
                    )}
                </div>
            </div>
            <Table className='h-[260px] border-[1px]'>
                <TableCaption>
                    {/* <span className='block'>Ces horaires sont susceptibles d'être eronnés</span> */}
                </TableCaption>
                <TableBody>
                    {daysOfWeek.map((day, idx) => {
                        const openingHour = hoursToDisplay[idx];
                        const openTime = openingHour.openTime || "Pas d'info";
                        const closeTime = openingHour.closeTime || "Pas d'info";

                        return (
                            <TableRow key={idx}>
                                <TableCell className='font-medium'>
                                    {day}
                                </TableCell>
                                <TableCell className='text-center'>
                                    {openTime && closeTime === "Pas d'info"
                                        ? openTime
                                        : openTime + ' - ' + closeTime}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default OpeningSchedule;
