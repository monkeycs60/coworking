import Image from 'next/image';
import React from 'react';

const HowTo = () => {
	return (
		<section className='my-[10vh] flex flex-col gap-8 overflow-x-hidden px-8 lg:h-[100vh]'>
			<div className='flex flex-col items-center justify-center gap-2  text-center'>
				<h2 className='text-2xl font-bold'>Comment ça marche ?</h2>
				<h3 className='text-sm text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
					Ce qui nous motive, c’est cette envie de vous faire redécouvrir
					votre ville et de nouvelles façons de travailler
				</h3>
			</div>
			<div className='bg-red-300'>
				<div className='flex flex-col gap-4 px-2'>
					<div className='relative'>
						<div className=' absolute -left-4 top-0 h-full w-2'>
							<Image
								src={'/howtoLINE.svg'}
								alt='flèche'
								fill
								className=''
							/>
						</div>
						<h4 className='text-xl font-bold'>
							Freelance, entrepreneur, salarié en télétravail ou étudiant
							?
						</h4>
					</div>
					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
						massa mi. Aliquam in hendrerit urna. Pellentesque sit amet
						sapien fringilla, mattis ligula consectetur, ultrices mauris.{' '}
					</p>
				</div>
				<div className='relative h-[300px] w-full px-4 '>
					<Image src={'/howto1.svg'} alt='flèche' fill />
				</div>
			</div>
		</section>
	);
};

export default HowTo;
