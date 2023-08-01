import HowWhoCard from '@/components/home/cards/HowWhoCard';

const HowTo = () => {
	return (
		<section className='my-[10vh] flex flex-col gap-8 overflow-x-hidden px-8'>
			<div className='flex flex-col items-center justify-center gap-2  text-center'>
				<h2 className='text-2xl font-bold'>Comment ça marche ?</h2>
				<h3 className='text-sm text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
					Ce qui nous motive, c’est cette envie de vous faire redécouvrir
					votre ville et de nouvelles façons de travailler
				</h3>
			</div>
			<HowWhoCard
				lineColorUrl={'/howtoLINE.svg'}
				responsiveBehavior={'flex-row'}
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
				responsiveBehavior={'flex-row-reverse'}
				subtitle={'Vous venez d’arriver dans une nouvelle ville ?'}
				content={
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. '
				}
				image={'/howto2.svg'}
			/>
			<HowWhoCard
				lineColorUrl={'/howtoLINE.svg'}
				customStyle='gap-6'
				responsiveBehavior={'flex-row'}
				subtitle={'C’est là qu’intervient Coworkez Malin !'}
				content={
					'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. '
				}
				image={'/howto3.png'}
			/>
			<HowWhoCard
				lineColorUrl={'/howtoLINE-blue.svg'}
				responsiveBehavior={'flex-row-reverse'}
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
