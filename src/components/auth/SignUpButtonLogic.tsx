'use client';

import { SignUpButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

const SignUpButtonLogic = () => {
    return (
        <SignUpButton
            mode='modal'

            // afterSignInUrl={window.location.href}
            // afterSignUpUrl={window.location.href}
            // redirectUrl={window.location.href}
        >
            <Button size={'specialButton'}>S&apos;inscrire</Button>
        </SignUpButton>
    );
};

export default SignUpButtonLogic;
