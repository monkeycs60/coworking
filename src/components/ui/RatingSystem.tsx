import { Controller } from "react-hook-form";
import StarRating from "./StarRating";

export interface RatingConfig {
    label: string;
    type: 'calm' | 'equip' | 'food' | 'feeling';
    errorText: string;
}

interface RatingSystemProps {
    control: any; 
    errors: any; 
    ratingsConfig: RatingConfig[];
}

const RatingSystem = ({
    control,
    errors,
    ratingsConfig,
}: RatingSystemProps) => {
    return (
        <div>
            {ratingsConfig.map((rating) => (
                <div
                    key={rating.type}
                    className='flex items-center justify-between gap-3'
                >
                    <p className='mr-4'>{rating.label}</p>
                    <Controller
                        name={`${rating.type}Rating`}
                        control={control}
                        defaultValue={0}
                        render={({ field }) => (
                            <StarRating
                                type={rating.type}
                                onChange={field.onChange}
                                value={field.value}
                            />
                        )}
                    />
                    {errors[`${rating.type}Rating`] && (
                        <p className='text-xs italic text-red-600'>
                            {rating.errorText}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RatingSystem;
