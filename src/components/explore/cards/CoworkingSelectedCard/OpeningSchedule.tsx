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
        <div className='my-8'>
            <Table className='h-[300px] w-[400px]'>
                <TableCaption>Horaires ouverture</TableCaption>
                <TableBody>
                    {weekdays.map((day, idx) => (
                        <TableRow key={idx}>
                            <TableCell className='font-medium'>{day}</TableCell>
                            <TableCell>{hoursToDisplay[idx]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default OpeningSchedule;
