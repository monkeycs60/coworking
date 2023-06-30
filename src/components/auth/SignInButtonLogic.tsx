'use client';

import { SignInButton } from '@clerk/nextjs';

const SignInButtonLogic = () => {
	return (
		<div>
			<SignInButton mode='modal' afterSignInUrl={window.location.href} />
		</div>
	);
};

export default SignInButtonLogic;
