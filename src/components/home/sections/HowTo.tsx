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
			
		</section>
	);
};

export default HowTo;
