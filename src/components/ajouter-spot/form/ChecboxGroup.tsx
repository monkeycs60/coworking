interface CheckboxInputProps {
    label: string;
    id: string;
    register: any;
}

interface CheckboxGroupProps {
    title: string;
    items: { label: string; id: string }[];
    register: any;
}

const CheckboxInput = ({ label, id, register }: CheckboxInputProps) => (
    <div className='flex items-center justify-between gap-2'>
        <label htmlFor={id}>{label}</label>
        <input type='checkbox' id={id} {...register(id)} />
    </div>
);

const CheckboxGroup = ({
    title,
    items,
    register,
}: CheckboxGroupProps) => (
    <div className='flex flex-col gap-6'>
        <h3 className='font-bold'>{title}</h3>
        <div className='flex w-[100%] flex-col gap-5 text-sm'>
            {items.map((item) => (
                <CheckboxInput
                    key={item.id}
                    label={item.label}
                    id={item.id}
                    register={register}
                />
            ))}
        </div>
    </div>
);

export default CheckboxGroup;
