import HowWhoCard from '@/components/home/cards/HowWhoCard';

const HowTo = () => {
	return (
		<section className='my-[10vh] flex flex-col gap-8 overflow-x-hidden px-8 lg:mb-4 lg:mt-36 lg:gap-1 3xl:gap-4'>
			<div className='flex flex-col items-center justify-center gap-2 text-center lg:mb-2 '>
				<h2 className='text-2xl font-bold'>Comment ça marche ?</h2>
				<h3 className='text-base text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
					Ce qui nous motive, c’est cette envie de vous faire redécouvrir
					votre ville et de nouvelles façons de travailler
				</h3>
			</div>
			<HowWhoCard
				lineColorUrl={'/howtoLINE.svg'}
				customStyle='lg:flex-row'
				imageSize='h-[300px] lg:h-[600px] lg:w-[600px]'
				responsiveBehavior={'flex-row lg:flex-col'}
				subtitle={
					'freelance, entrepreneur, salarié en télétravail ou étudiant ?'
				}
				content={
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. '
				}
				image={'/howto1.svg'}
			/>
			<HowWhoCard
				lineColorUrl={'/howtoLINE-blue.svg'}
				customStyle='lg:flex-row-reverse'
				imageSize='h-[300px] lg:h-[600px] lg:w-[600px]'
				responsiveBehavior={'flex-col'}
				subtitle={'Vous venez d’arriver dans une nouvelle ville ?'}
				content={
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. '
				}
				image={'/howto2.svg'}
			/>
			<HowWhoCard
				lineColorUrl={'/howtoLINE.svg'}
				customStyle='gap-8 lg:flex-row'
				imageSize='h-[200px] border-[1px] border-black rounded-[10px] lg:h-[310px] lg:w-[500px] '
				responsiveBehavior={'flex-col'}
				subtitle={'C’est là qu’intervient Coworkez Malin !'}
				content={
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. '
				}
				image={'/howto3.png'}
			/>
			<HowWhoCard
				lineColorUrl={'/howtoLINE-blue.svg'}
				customStyle='lg:flex-row-reverse'
				imageSize='h-[300px] lg:h-[600px] lg:w-[600px]'
				responsiveBehavior={'flex-col'}
				subtitle={'Etablissements coworking-friendly'}
				content={
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. '
				}
				image={'/howto4.svg'}
			/>
		</section>
	);
};

export default HowTo;
