import { useFormContext } from 'react-hook-form';
import { TreeDeciduous } from 'lucide-react';

interface SingleChoiceButtonProps {
    name: string;
    value: string; // Unique value for this choice
    label: string;
}

const SingleChoice = ({ name, value, label }: SingleChoiceButtonProps) => {
    const { register, watch } = useFormContext();
    const isSelected = watch(name) === value;

    const buttonStyle = isSelected ? { backgroundColor: 'blue' } : {};

    return (
        <label style={buttonStyle}>
            <input type="radio" value={value} {...register(name)} style={{ display: 'none' }} />
            <div>
                <TreeDeciduous />
                {label}
            </div>
        </label>
    );
};

export default SingleChoice;
