import Image from 'next/image';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

export default function Home() {
	return (
		<section className='overall-bg flex h-screen w-full flex-col justify-center'>
			<div className='mt-[27vh] flex h-full gap-4 '>
				<div className='flex w-[55%] flex-col '>
					<div className='flex flex-col gap-4'>
						<h2 className=' text-4xl font-bold leading-normal 3xl:text-5xl 3xl:leading-relaxed'>
							Découvrez des lieux conviviaux où coworker gratuitement !
						</h2>
						<h3 className='w-[75%] text-gray-700 3xl:text-lg'>
							Grâce à notre communauté, trouvez les bons plans pour
							travailler malin dans la ville de votre choix.
						</h3>
					</div>
					<div className='flex flex-col gap-3 pt-14'>
						<form action=''>
							<div className='relative flex items-center gap-2'>
								<MapPin
									size={20}
									className='absolute left-4 text-gray-600'
								/>
								<input
									type='text'
									placeholder='Entrez une ville'
									className='rounded-xl border-2 border-gray-500 px-20 py-2 indent-0 3xl:px-28 3xl:py-4'
								/>
								<Button
									variant={'default'}
									size={'sm'}
									className='3xl:px-6 3xl:py-4'>
									<Image
										src={'/search-refraction.svg'}
										alt='search'
										width={20}
										height={20}
										className='pointer-events-none 3xl:h-[26px] 3xl:w-[26px] '
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
				<div className='flex w-[45%] justify-end '>
					<div
						className={clsx(
							'relative flex h-[80%] w-[90%] justify-end',
							'3xl:h-[55%] 3xl:w-[100%] '
						)}>
						<Image
							src='/landing-laptop-friends.webp'
							alt='Coworkers autour d un laptop'
							className='z-20'
							fill={true}
						/>
						<Image
							width={360}
							height={360}
							src='/Hand-drawn-arrow.svg'
							alt='Coworkers autour d un laptop'
							className='absolute -bottom-20 -left-64 z-20 3xl:-bottom-32 3xl:pointer-events-none'
						/>
						<Image
							width={160}
							height={160}
							src='/Ellipse-yellow.svg'
							alt='Coworkers autour d un laptop'
							className='absolute -bottom-16 right-0'
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
