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
				<p className='text-[10px] text-gray-600'>
					Votre partenaire pour coworker malin
				</p>
			</div>
			<div className='flex flex-col gap-2 '>
				<div className='flex gap-2 text-xs font-semibold'>
					<p>Coworking</p>
				</div>
				<div className='flex flex-col text-[10px]'>
					<Link href='/coworking-list'>Explorer</Link>
					<Link href='/add-coworking'>Ajouter</Link>
				</div>
			</div>
			<div className='flex flex-col gap-2 '>
				<div className='flex gap-2 text-xs font-semibold'>
					<p>Concept</p>
				</div>
				<div className='flex flex-col text-[10px]'>
					<Link href='/about'>Philosophie</Link>
					<Link href='/about'>Fonctionnement</Link>
				</div>
			</div>
		</div>
	);
};

export default Footer;
