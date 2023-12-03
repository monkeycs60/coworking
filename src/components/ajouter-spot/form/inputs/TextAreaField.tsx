import { AlertTriangle } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

interface TextAreaFieldProps {
    defaultValue?: string;
    label: string;
    subLabel?: string;
    name: string;
    error: any;
    isMandatory?: boolean;
}

const TextAreaField = ({
    defaultValue,
    label,
    subLabel,
    name,
    error,
    isMandatory,
}: TextAreaFieldProps) => {
    const { register } = useFormContext();

    return (
        <div className='relative flex w-full flex-col gap-2 rounded-xl'>
            <div className='flex flex-col'>
                <label className='font-bold' htmlFor={name}>
                    {label}
                </label>
                <span className='text-xs italic'>{subLabel}</span>
            </div>
            <textarea
                {...register(name)}
                id={name}
                name={name}
                className='h-[150px] w-full rounded-xl bg-gray-100 p-4'
                defaultValue={defaultValue}
            />
            {isMandatory && (
                <AlertTriangle className='absolute right-4 top-1 h-4 w-4 text-red-600' />
            )}
            {error && (
                <p className='text-xs italic text-red-600'>{error.message}</p>
            )}
        </div>
    );
};
export default TextAreaField;
