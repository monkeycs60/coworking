import SignInButtonLogic from '@/components/auth/SignInButtonLogic';
import { SignOutButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

async function NavBar() {
	return (
		<div className='flex justify-between'>
			<div>
				<Image src={'/logo.png'} alt='logo' width={30} height={22} />
			</div>
			<ul className='flex'>
				<li>
					<Link href={'/'}>Home</Link>
				</li>
				<li>
					<Link href={'about'}>A propos</Link>
				</li>
				<li>
					<Link href={'/explore'}>Explorer</Link>
				</li>
				<SignInButtonLogic />
				<li>sign up</li>
				<SignOutButton />
				<UserButton />
			</ul>
		</div>
	);
}

export default NavBar;
