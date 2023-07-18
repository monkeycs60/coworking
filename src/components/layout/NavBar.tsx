import SignInButtonLogic from '../auth/SignInButtonLogic';
import { SignOutButton, UserButton, auth } from '@clerk/nextjs';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import SignUpButtonLogic from '../auth/SignUpButtonLogic';

async function NavBar() {
	const { userId } = await auth();
	return (
		<div className='fixed z-10 mt-4 flex w-[1200px] justify-between gap-10  py-2'>
			<div className='flex items-center justify-center gap-14'>
				<div className='flex items-center justify-center gap-4'>
					<Image
						src={'/logo-cowork-v1-nobg.png'}
						alt='logo'
						width={40}
						height={40}
					/>
					<h1 className='font-telma text-xl font-semibold first-letter:text-primary'>
						Coworkez{' '}
						<span className='block first-letter:text-secondary'>
							Malin
						</span>{' '}
					</h1>
				</div>
				<ul className='flex items-center justify-center gap-6 font-semibold'>
					<li>
						<Link href={'/about'}>A propos</Link>
					</li>
					<li>
						<Link href={'/faq'}>FAQ</Link>
					</li>
					<li>
						<Link href={'/coworking-list'}>Explorer</Link>
					</li>
					<li>
						<Link href={'/add-coworking'}>Ajouter un spot</Link>
					</li>
				</ul>
			</div>
			<div className='flex items-center justify-center gap-2'>
				{userId ? (
					<>
						<SignOutButton>
							<Button variant='outline'>Sign out</Button>
						</SignOutButton>
						<UserButton />
					</>
				) : (
					<>
						<SignInButtonLogic />
						<SignUpButtonLogic />
					</>
				)}
			</div>
		</div>
	);
}

export default NavBar;
