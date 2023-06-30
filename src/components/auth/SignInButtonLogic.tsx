'use client';

import { SignInButton } from '@clerk/nextjs';

const SignInButtonLogic = () => {
	return (
		<div>
			<SignInButton
				mode='modal'
				afterSignInUrl={window.location.href}
				afterSignUpUrl={window.location.href}
                redirectUrl={window.location.href}
			/>
		</div>
	);
};

export default SignInButtonLogic;
