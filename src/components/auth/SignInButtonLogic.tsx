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
			<Button>Sign in</Button>
		</SignInButton>
	);
};

export default SignInButtonLogic;
