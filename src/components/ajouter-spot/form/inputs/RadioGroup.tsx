import { AlertTriangle } from 'lucide-react';
import { FieldError, useFormContext } from 'react-hook-form';

interface RadioButtonProps {
    label: string;
    id: string;
    value: string;
    name: string;
}

const RadioButton = ({ label, id, value, name }: RadioButtonProps) => {
    const { register } = useFormContext();
    return (
        <div className='flex items-center justify-between gap-2'>
            <label htmlFor={id}>{label}</label>
            <input type='radio' id={id} value={value} {...register(name)} />
        </div>
    );
};

interface RadioGroupProps {
    title: string;
    name: string;
    items: { label: string; id: string }[];
    error?: FieldError;
    isMandatory?: boolean;
}

const RadioGroup = ({
    title,
    name,
    items,
    error,
    isMandatory,
}: RadioGroupProps) => {
    return (
        <div className='relative flex flex-col gap-6'>
            <h3 className='font-bold'>{title}</h3>
            <div className='flex w-[100%] flex-col gap-5 text-sm'>
                {items.map((item) => (
                    <RadioButton
                        key={item.id}
                        label={item.label}
                        id={item.id}
                        value={item.id}
                        name={name}
                    />
                ))}
            </div>
            {isMandatory && (
                <AlertTriangle className='absolute right-2 top-1 h-4 w-4 text-red-600' />
            )}
            {error && (
                <p className='text-xs italic text-red-600'>{error.message}</p>
            )}
        </div>
    );
};

export default RadioGroup;
