import { AlertTriangle } from 'lucide-react';
import { FieldError, useFormContext } from 'react-hook-form';
interface InputFieldProps {
    defaultValue: string;
    label: string;
    subLabel?: string;
    name: string;
    error?: FieldError;
    isMandatory?: boolean;
}

const InputField = ({
    defaultValue,
    label,
    subLabel,
    name,
    error,
    isMandatory,
}: InputFieldProps) => {
    const { register } = useFormContext();
    return (
        <div className='relative flex w-full flex-col gap-2 rounded-xl'>
            <div className='flex flex-col'>
                <label className='font-bold' htmlFor={name}>
                    {label}
                </label>
                <span className='text-xs italic'>{subLabel}</span>
            </div>
            <input
                {...register(name)}
                id={name}
                name={name}
                className='w-full rounded-xl bg-gray-100 p-4'
                type='text'
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

export default InputField;
