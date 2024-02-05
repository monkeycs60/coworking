import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
	return (
		<div className='mt-16 flex flex-col items-center justify-between gap-4 border-t-[1px] bg-primary px-12 py-5 lg:flex-row lg:gap-0 lg:py-3'>
			<Link
				href={'/'}
				className='order-1 flex items-center justify-center gap-4 sm:gap-10'
			>
				<Image
					src={'/images/navbar-logo.svg'}
					alt='logo'
					width={328}
					height={65}
					className={`w-[140px] transition-transform duration-500 ease-in-out lg:w-[165px] 2xl:w-[200px] 3xl:w-[250px]`}
				/>
			</Link>
			<p className='order-3 text-center text-xs lg:order-2 lg:text-start'>©Copyright 2024 -  Créé et designé par Clément Serizay & Solenn Toupin</p>
			<div className='order-2 flex items-center gap-2 lg:order-3'>
				<Link href='https://www.instagram.com/' target='_blank' className='hover:scale-110'>
					<Image src={'/images/insta.svg'} alt='twitter' width={20} height={20} />
				</Link>
				<Link href='https://www.linkedin.com/company/coworkez-malin/about/' target='_blank' className='hover:scale-110'>
					<Image src={'/images/linkedin.svg'} alt='instagram' width={28} height={28} />
				</Link>
				<Link href='https://github.com/monkeycs60' target='_blank' className='hover:scale-110'>
					<Image src={'/images/github.svg'} alt='facebook' width={20} height={20} />
				</Link>
			</div>
		</div>
	);
};

export default Footer;
