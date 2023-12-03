import { Button } from './button';
import { Loader2 } from 'lucide-react';

interface LoaderButtonProps {
    buttonClassName?: string;
    waitingToSubmit: boolean;
    buttonMessage: string;
}

const LoaderButton = ({
    buttonClassName,
    waitingToSubmit,
    buttonMessage,
}: LoaderButtonProps) => {
    return (
        <Button
            type='submit'
            variant={'default'}
            size={'sm'}
            className={buttonClassName}
            disabled={waitingToSubmit}
        >
            {waitingToSubmit ? (
                <Loader2 className='animate-spin' />
            ) : (
                <span>{buttonMessage}</span>
            )}
        </Button>
    );
};

export default LoaderButton;
