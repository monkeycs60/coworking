import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
	return (
		<div className='flex justify-between border-t-[1px] p-6'>
			<div className='flex w-[40%] flex-col gap-1'>
				<Image
					src='/logo-cowork-v1-nobg.png'
					alt='logo'
					width={22}
					height={22}
				/>
				<p className='text-[10px] text-gray-600 lg:mt-2 lg:text-[14px] '>
					Votre partenaire pour coworker malin
				</p>
			</div>
			<div className='flex flex-col gap-2 '>
				<div className='flex gap-2 text-xs font-semibold lg:text-sm'>
					<p>Coworking</p>
				</div>
				<div className='flex flex-col text-[10px] lg:text-[14px] '>
					<Link href='/coworking-list' className='hover:underline'>
						Explorer
					</Link>
					<Link href='/add-coworking' className='hover:underline'>
						Ajouter
					</Link>
				</div>
			</div>
			<div className='flex flex-col gap-2 '>
				<div className='flex gap-2 text-xs font-semibold lg:text-sm'>
					<p>Concept</p>
				</div>
				<div className='flex flex-col text-[10px] lg:text-[14px]'>
					<Link href='/about' className='hover:underline'>
						Philosophie
					</Link>
					<Link href='/about' className='hover:underline'>
						Fonctionnement
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
