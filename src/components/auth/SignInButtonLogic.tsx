'use client';

import { SignInButton } from '@clerk/nextjs';
import { Button } from '../ui/button';

const SignInButtonLogic = () => {
	return (
		<SignInButton
			mode='modal'
			// afterSignInUrl={window.location.href}
			// afterSignUpUrl={window.location.href}
			// redirectUrl={window.location.href}
		>
			<div className='linkHoverEffect'>
				<Button variant={'ghost'} size={'special'}>Connexion</Button>
			</div>
		</SignInButton>
	);
};

export default SignInButtonLogic;
