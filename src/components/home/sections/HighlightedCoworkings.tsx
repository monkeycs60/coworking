import { Button } from '@/components/ui/button';
import { highlightedCoworkings } from '@/data/highlightedCoworkings';
import Image from 'next/image';

const HighlightedCoworkings = () => {
	return (
		<section className='mt-8 flex h-[100dvh] flex-col gap-8 overflow-x-hidden px-4'>
			<div>
				<h2 className='text-2xl font-bold'>
					Récemment dénichés par la communauté
				</h2>
				<h3 className='text-sm text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
					Découvrez les derniers lieux ajoutés par nos membres
				</h3>
			</div>
			<Button
				variant={'default'}
				size={'sm'}
				className='w-full lg:w-auto 3xl:px-6 3xl:py-3'>
				<span>Explorer tous les coworkings</span>
			</Button>
			<div className='flex gap-4'>
				{highlightedCoworkings.map((coworking) => (
					<div key={coworking.id} className='flex w-[200px] flex-col'>
						<h3>{coworking.name}</h3>
						<p>{coworking.location}</p>
						<p>{coworking.comfortScore}</p>
						<p>{coworking.calmScore}</p>
						<p>{coworking.wifiScore}</p>
						<Image
							src={coworking.illustration}
							alt='coworking'
							width={200}
							height={200}
							className='object-cover'
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default HighlightedCoworkings;
