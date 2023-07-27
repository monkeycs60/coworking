'use client';

import Image from 'next/image';
import React, { useState } from 'react';

const Assets = () => {
	const [selected, setSelected] = useState('flexibility');

	return (
		<section className='mt-8 flex flex-col gap-8 overflow-x-hidden lg:h-[100vh]'>
			<div className='flex flex-col gap-2 px-4'>
				<h2 className='text-2xl font-bold'>Les atouts Coworkez Malin</h2>
				<h3 className='text-sm text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
					Ce qui nous motive, c’est cette envie de vous faire redécouvrir
					votre ville et de nouvelles façons de travailler
				</h3>
			</div>
			<div className='flex gap-4 px-4'>
				<div className='flex w-1 flex-col'>
					<div
						className={`grow transition-all duration-300 ${
							selected === 'flexibility' ? 'bg-primary' : 'bg-gray-300'
						}`}
						onMouseEnter={() => setSelected('flexibility')}></div>
					<div
						className={`grow transition-all duration-300 ${
							selected === 'share' ? 'bg-primary' : 'bg-gray-300'
						}`}
						onMouseEnter={() => setSelected('share')}></div>
					<div
						className={`grow transition-all duration-300 ${
							selected === 'free' ? 'bg-primary' : 'bg-gray-300'
						}`}
						onMouseEnter={() => setSelected('free')}></div>
				</div>
				<div className='flex flex-1 flex-col gap-4 px-4 py-2'>
					<div
						className='group relative hover:border-primary'
						onMouseEnter={() => setSelected('flexibility')}>
						<h4 className='font-bold'>Flexibilité</h4>
						<p>
							Venez profiter sans prise de tête de nos d’établissements
							repertoriés. Travaillez où vous voulez, quand vous voulez
							et avec qui vous voulez.
						</p>
					</div>
					<div
						className='group relative hover:border-primary'
						onMouseEnter={() => setSelected('share')}>
						<h4 className='font-bold'>Partage</h4>
						<p>
							Partagez vos meilleures adresses et commentez celles des
							autres. Vous n’êtes qu’à un clic de rencontrer de nouveaux
							coworkers.
						</p>
					</div>
					<div
						className='group relative hover:border-primary'
						onMouseEnter={() => setSelected('free')}>
						<h4 className='font-bold'>Gratuité</h4>
						<p>
							Pas de frais d’abonnement, pas de coûts de mise en
							relation. Votre seul investissement, c’est votre café
							latte.
						</p>
					</div>
				</div>
			</div>
			<div className='relative h-[200px] w-screen'>
				<Image
					src='/man-phonecall.jpg'
					alt='homme assis devant laptop'
					fill={true}
				/>
			</div>
		</section>
	);
};

export default Assets;
