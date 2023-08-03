import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

const Hero = () => {
	return (
		<section className='overall-bg mb-[10vh] flex w-full flex-col justify-center lg:mb-0 lg:h-screen '>
			<div className='mt-12 flex h-full flex-col gap-4 lg:mt-[27vh] lg:flex-row '>
				<div className='flex flex-col px-4 lg:w-[55%] lg:px-0'>
					<div className='flex flex-col gap-4'>
						<h2 className='text-2xl font-bold leading-normal lg:text-4xl 3xl:text-5xl 3xl:leading-relaxed'>
							Découvrez des lieux conviviaux où coworker gratuitement !
						</h2>
						<h3 className='text-base text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
							Grâce à notre communauté, trouvez les bons plans pour
							travailler malin dans la ville de votre choix.
						</h3>
					</div>
					<div className='flex flex-col gap-3 pt-8 lg:pt-14'>
						<form action=''>
							<div className='relative flex flex-col items-center gap-2 lg:flex-row'>
								<MapPin
									size={20}
									className='absolute left-4 top-3 text-gray-600 3xl:top-4'
								/>
								<input
									type='text'
									placeholder='Entrez une ville'
									className='w-full rounded-xl border-2 border-gray-500 px-4 py-2 indent-8 lg:w-auto lg:px-20 lg:py-2 lg:indent-0 3xl:px-28 3xl:py-3'
								/>
								<Button
									variant={'default'}
									size={'sm'}
									className='w-full lg:w-auto 3xl:px-6 3xl:py-3'>
									<Image
										src={'/search-refraction.svg'}
										alt='search'
										width={20}
										height={20}
										className='pointer-events-none lg:h-[20px] lg:w-[20px] 3xl:h-[26px] 3xl:w-[26px]'
									/>
								</Button>
							</div>
						</form>
						<p className='text-xs text-gray-600'>
							Rencontrez de nouvelles personnes, découvrez des endroits
							inédits
						</p>
					</div>
				</div>
				<div className='mt-[5vh] flex justify-center lg:mt-0 lg:w-[45%] lg:justify-end '>
					<div
						className={clsx(
							'relative flex h-[240px] w-[300px]',
							'lg:h-[80%] lg:w-[90%] lg:justify-end',
							'3xl:h-[55%] 3xl:w-[100%] '
						)}>
						<Image
							src='/landing-laptop-friends.webp'
							alt='Coworkers autour d un laptop'
							className='z-20'
							fill={true}
						/>
						<Image
							width={1154}
							height={1026}
							src='/Hand-drawn-arrow.svg'
							alt='Coworkers autour d un laptop'
							className='absolute -bottom-20 -left-64 z-20 hidden lg:block 3xl:pointer-events-none 3xl:-bottom-32'
						/>
						<Image
							width={160}
							height={160}
							src='/Ellipse-yellow.svg'
							alt='Coworkers autour d un laptop'
							className='absolute -right-4 -top-8 lg:-bottom-16 lg:right-0'
						/>
						<Image
							width={160}
							height={160}
							src='/Ellipse-blue.svg'
							alt='Coworkers autour d un laptop'
							className='absolute -bottom-8 -left-4 lg:hidden'
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
