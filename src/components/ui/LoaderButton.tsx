import { Button } from './button';
import { Loader2 } from 'lucide-react';

interface LoaderButtonProps {
    buttonClassName: string;
    waitingToSubmit: boolean;
}

const LoaderButton = ({
    buttonClassName,
    waitingToSubmit,
}: LoaderButtonProps) => {
    return (
        <Button
            variant={'default'}
            size={'sm'}
            className={buttonClassName}
            disabled={waitingToSubmit}
        >
            {waitingToSubmit ? (
                <Loader2 className='animate-spin' />
            ) : (
                <span>Ajouter ce cowork</span>
            )}
        </Button>
    );
};

export default LoaderButton;
