interface TextAreaFieldProps {
    register: any;
    defaultValue?: string;
    label: string;
    name: string;
    error: any;
}

const TextAreaField = ({
    register,
    defaultValue,
    label,
    name,
    error,
}: TextAreaFieldProps) => (
    <div>
        <label htmlFor={name}>{label}</label>
        <textarea
            {...register(name)}
            id={name}
            name={name}
            className='w-full bg-teal-400 p-4'
            defaultValue={defaultValue}
        />
        {error && (
            <p className='text-xs italic text-red-600'>{error.message}</p>
        )}
    </div>
);

export default TextAreaField;
