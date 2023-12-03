import { useFormContext } from 'react-hook-form';

interface CheckboxInputProps {
    label: string;
    id: string;
}

interface CheckboxGroupProps {
    title: string;
    items: { label: string; id: string }[];
}

const CheckboxInput = ({ label, id }: CheckboxInputProps) => {
    const { register } = useFormContext();
    return (
        <div className='flex items-center justify-between gap-2'>
            <label htmlFor={id}>{label}</label>
            <input type='checkbox' id={id} {...register(id)} />
        </div>
    );
};

const CheckboxGroup = ({ title, items }: CheckboxGroupProps) => {
    return (
        <div className='flex flex-col gap-6'>
            <h3 className='font-bold'>{title}</h3>
            <div className='flex w-[100%] flex-col gap-5 text-sm'>
                {items.map((item) => (
                    <CheckboxInput
                        key={item.id}
                        label={item.label}
                        id={item.id}
                    />
                ))}
            </div>
        </div>
    );
};

export default CheckboxGroup;
