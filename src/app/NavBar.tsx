import { SignInButton, SignOutButton } from '@/components/AuthButtons';
import AuthCheck from '@/components/AuthCheck';
import Image from 'next/image';
import Link from 'next/link';
const NavBar = () => {
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
				<li>
					<SignInButton />
				</li>
				<li>
					<AuthCheck>
						<SignOutButton />
					</AuthCheck>
				</li>
			</ul>
		</div>
	);
};

export default NavBar;
