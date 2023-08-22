interface InputFieldProps {
    register: any;
    defaultValue: string;
    label: string;
    name: string;
    error: any;
}

const InputField = ({
    register,
    defaultValue,
    label,
    name,
    error,
}: InputFieldProps) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <input
            {...register(name)}
            id={name}
            name={name}
            className='w-full bg-teal-400 p-4'
            type='text'
            defaultValue={defaultValue}
        />
        {error && (
            <p className='text-xs italic text-red-600'>{error.message}</p>
        )}
    </div>
);

export default InputField;
