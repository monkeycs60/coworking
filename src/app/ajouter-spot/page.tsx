import PlacesAutocomplete from '@/components/maps/PlacesAutocomplete';
import { Info } from 'lucide-react';

const page = () => {
	return (
		<section className='mt-16 min-h-[800px] bg-gray-200 p-10 lg:mt-32 xl:mt-48 3xl:mt-64 '>
			<div className='mt-4 flex flex-col justify-center gap-8 text-center'>
				<div className='m-auto flex w-2/3 items-center gap-4 border-[1px] border-black p-4'>
					<Info className='h-12 w-12' />
					<p className='max-w-[700px] text-justify text-sm'>
						Vous venez de découvrir un nouvel espace où coworker
						gratuitement et vous souhaitez le partager à la communauté.
						Vous êtes sur la bonne page. Café, hôtel, bibliothèque ou
						tiers-lieu, rentrez le nom de votre nouveau spot préféré dans
						la barre de recherche ci-dessous.
					</p>
				</div>
				<PlacesAutocomplete />
			</div>
		</section>
	);
};

export default page;
