import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableRow,
} from '@/components/ui/table';
import { Coworking } from '@/types/coworking';

const OpeningSchedule = ({ coworking }: { coworking: Coworking }) => {
    const weekdays = [
        'Lundi',
        'Mardi',
        'Mercredi',
        'Jeudi',
        'Vendredi',
        'Samedi',
        'Dimanche',
    ];
    const hoursToDisplay =
        coworking.openingHours && coworking.openingHours.length === 7
            ? [
                  coworking.openingHours[6], // Dimanche
                  ...coworking.openingHours.slice(0, 6), // Lundi à Samedi
              ]
            : new Array(7).fill({ openTime: "Pas d'info", closeTime: '' });
    return (
        <div className='my-8 font-inter lg:w-[60%]'>
            <Table className='h-[260px] w-[320px] lg:h-[300px] lg:w-[400px]'>
                <TableCaption>Horaires ouverture</TableCaption>
                <TableBody>
                    {weekdays.map((day, idx) => {
                        const openingHour = hoursToDisplay[idx];
                        const openTime = openingHour.openTime || "Pas d'info";
                        const closeTime = openingHour.closeTime || "Pas d'info";

                        return (
                            <TableRow key={idx}>
                                <TableCell className='font-medium'>
                                    {day}
                                </TableCell>
                                <TableCell>
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
