import { AlertTriangle } from 'lucide-react';
interface InputFieldProps {
    register: any;
    defaultValue: string;
    label: string;
    name: string;
    error: any;
    isMandatory?: boolean;
}

const InputField = ({
    register,
    defaultValue,
    label,
    name,
    error,
    isMandatory,
}: InputFieldProps) => (
    <div className='relative flex w-full flex-col gap-2 rounded-xl'>
        <label className='font-semibold' htmlFor={name}>
            {label}
        </label>
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

export default InputField;
