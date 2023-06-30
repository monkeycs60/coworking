import SignInButtonLogic from '../auth/SignInButtonLogic';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

async function NavBar() {
	return (
		<div className='flex justify-between p-4'>
			<div>
				<Image src={'/logo.png'} alt='logo' width={240} height={120} />
			</div>
			<ul className='flex h-10 items-center gap-6 pt-4'>
				<li>
					<Link href={'/'}>Home</Link>
				</li>
				<li>
					<Link href={'about'}>A propos</Link>
				</li>
				<li>
					<Link href={'/coworking-list'}>Explorer</Link>
				</li>
				<SignInButtonLogic />
				<SignOutButton>
					<Button variant='outline'>Sign out</Button>
				</SignOutButton>
				<UserButton />
			</ul>
		</div>
	);
}

export default NavBar;
