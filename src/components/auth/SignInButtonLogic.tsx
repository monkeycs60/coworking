'use client';

import { SignInButton } from '@clerk/nextjs';
import { useParams } from 'next/navigation';

const SignInButtonLogic = () => {
	const params = useParams();
	console.log(params);

	return (
		<div>
			<SignInButton mode='modal' />
		</div>
	);
};

export default SignInButtonLogic;
