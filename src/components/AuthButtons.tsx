'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';

export function SignInButton() {
	const { data: session, status } = useSession();
	console.log(session, status);

	if (status === 'loading') {
		return <>...</>;
	}

	if (status === 'authenticated') {
		return (
			<Link href='/'>
				<Image
					src={session?.user?.image ?? '/black_dot.png'}
					alt={session?.user?.name ?? 'Your name'}
					width={32}
					height={32}
					className='rounded-full'
				/>
			</Link>
		);
	}

	return (
		<button
			onClick={() => signIn(
				
			)}
			className='rounded-md bg-blue-500 px-4 py-2 text-white'>
			Sign In
		</button>
	);
}

export function SignOutButton() {
	return (
		<button
			onClick={() => signOut()}
			className='rounded-md bg-blue-500 px-4 py-2 text-white'>
			Sign Out
		</button>
	);
}
