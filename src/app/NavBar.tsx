import { SignInButton, SignOutButton } from '@/components/AuthButtons';
import AuthCheck from '@/components/AuthCheck';
import Image from 'next/image';
import Link from 'next/link';
import SignupPage from '@/components/SignUp';
import { getServerSession } from 'next-auth';

async function NavBar() {
	const session = await getServerSession();
	const userMail = session?.user?.email;

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
					<SignupPage />
				</li>
				<li>
					<AuthCheck>
						<SignOutButton />
					</AuthCheck>
				</li>
				<li>{userMail}</li>
			</ul>
		</div>
	);
}

export default NavBar;
