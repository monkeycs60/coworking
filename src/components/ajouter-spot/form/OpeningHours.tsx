import { daysOfWeek } from '@/lib/const/daysOfWeek';
import { getTimeFromDay } from '@/lib/functions/getTimeFromDay';
import { PlaceDetail } from '@/types/placeDetails';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';

interface OpeningHoursProps {
    register: any;
    placeDetails: PlaceDetail;
    errors: any;
}

const OpeningHours = ({
    register,
    placeDetails,
    errors,
}: OpeningHoursProps) => {
    const OpeningHourInput = ({
        day,
        index,
        defaultValue,
    }: {
        day: string;
        index: number;
        defaultValue: string;
    }) => (
        <div key={index} className='mt-2'>
            <label
                htmlFor={`openingHours.${index}`}
                className='block text-sm font-medium text-gray-700'
            >
                {day}
            </label>
            <input
                {...register(`openingHours.${index}`)}
                id={`openingHours.${index}`}
                name={`openingHours.${index}`}
                className='mt-1 w-full bg-gray-100 p-4'
                type='text'
                defaultValue={getTimeFromDay(defaultValue)}
            />
            {(errors as unknown as { [key: string]: any })[
                `openingHours.${index}`
            ] && (
                <p className='text-xs italic text-red-600'>
                    Veuillez entrer un horaire valide
                </p>
            )}
        </div>
    );

    return (
        <div className='w-full'>
            <label className='font-bold' htmlFor='placeHours'>
                Horaires d&apos;ouverture
            </label>
            {placeDetails.current_opening_hours &&
            placeDetails.current_opening_hours.weekday_text
                ? placeDetails.current_opening_hours.weekday_text.map(
                      (day: string, index: number) => {
                          const dayName = day.split(':')[0];
                          return (
                              <OpeningHourInput
                                  key={index}
                                  day={dayName}
                                  index={index}
                                  defaultValue={day.split(':')[1]?.trim()}
                              />
                          );
                      },
                  )
                : daysOfWeek.map((day, index) => (
                      <OpeningHourInput
                          key={index}
                          day={day}
                          index={index}
                          defaultValue=''
                      />
                  ))}
        </div>
    );
};

export default OpeningHours;
