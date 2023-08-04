'use client';

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';

const Assets = () => {
	const [asset, setAsset] = useState({
		selected: 'flexibility',
		imgSource: '/man-phonecall.jpg',
		imgAlt: 'homme au téléphone',
	});

	const keyRef = useRef(0);

	useEffect(() => {
		keyRef.current += 1;
	}, [asset.imgSource]);

	return (
		<section className='my-[5vh] flex flex-col gap-8 overflow-x-hidden lg:h-[100vh]'>
			<div className='flex flex-col gap-2 px-4'>
				<h2 className='text-2xl font-bold'>Les atouts Coworkez Malin</h2>
				<h3 className='text-base text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
					Ce qui nous motive, c’est cette envie de vous faire redécouvrir
					votre ville et de nouvelles façons de travailler
				</h3>
			</div>
			<div className='flex gap-4 px-4'>
				<div className='flex w-1 flex-col'>
					<div
						className={`grow transition-all duration-300 ${
							asset.selected === 'flexibility'
								? 'bg-primary'
								: 'bg-gray-300'
						}`}
						onMouseEnter={() => {
							setAsset({
								selected: 'flexibility',
								imgSource: '/man-phonecall.jpg',
								imgAlt: 'homme au téléphone',
							});
						}}
					/>
					<div
						className={`grow transition-all duration-300 ${
							asset.selected === 'share' ? 'bg-primary' : 'bg-gray-300'
						}`}
						onMouseEnter={() => {
							setAsset({
								selected: 'share',
								imgSource: '/share.jpg',
								imgAlt: 'deux personnes en entretien',
							});
						}}
					/>
					<div
						className={`grow transition-all duration-300 ${
							asset.selected === 'free' ? 'bg-primary' : 'bg-gray-300'
						}`}
						onMouseEnter={() => {
							setAsset({
								selected: 'free',
								imgSource: '/free.jpg',
								imgAlt: 'porte-monnaie vide',
							});
						}}
					/>
				</div>
				<div className='flex flex-1 flex-col gap-4 px-4 py-2'>
					<div
						className='group relative hover:border-primary'
						onMouseEnter={() => {
							setAsset({
								selected: 'flexibility',
								imgSource: '/man-phonecall.jpg',
								imgAlt: 'homme au téléphone',
							});
						}}>
						<h4 className='font-bold'>Flexibilité</h4>
						<p>
							Venez profiter sans prise de tête de nos d’établissements
							repertoriés. Travaillez où vous voulez, quand vous voulez
							et avec qui vous voulez.
						</p>
					</div>
					<div
						className='group relative hover:border-primary'
						onMouseEnter={() => {
							setAsset({
								selected: 'share',
								imgSource: '/share.jpg',
								imgAlt: 'deux personnes en entretien',
							});
						}}>
						<h4 className='font-bold'>Partage</h4>
						<p>
							Partagez vos meilleures adresses et commentez celles des
							autres. Vous n’êtes qu’à un clic de rencontrer de nouveaux
							coworkers.
						</p>
					</div>
					<div
						className='group relative hover:border-primary'
						onMouseEnter={() => {
							setAsset({
								selected: 'free',
								imgSource: '/free.jpg',
								imgAlt: 'porte-monnaie vide',
							});
						}}>
						<h4 className='font-bold'>Gratuité</h4>
						<p>
							Pas de frais d’abonnement, pas de coûts de mise en
							relation. Votre seul investissement, c’est votre café
							latte.
						</p>
					</div>
				</div>
			</div>
			<div className='relative h-[250px] w-screen'>
				<Image
					src={asset.imgSource}
					alt={asset.imgAlt}
					fill={true}
					priority={true}
				/>
			</div>
		</section>
	);
};

export default Assets;
