import PlacesAutocomplete from '@/components/maps/PlacesAutocomplete';
import { Info, Home } from 'lucide-react';

const page = () => {
    return (
        <section className='mt-16 min-h-[500px] p-4 lg:mt-32 lg:p-10 xl:mt-48 3xl:mt-64 '>
            <div className='mt-4 flex flex-col justify-center gap-12 text-center'>
                <div className='m-auto flex w-full items-center gap-4 rounded-xl border-[1px] border-primary bg-primary/10 p-4 lg:w-2/3'>
                    <Info className='h-16 w-16' />
                    <div className='flex flex-col gap-4'>
                        <p className=' text-justify text-sm'>
                            Tu viens de découvrir un nouvel espace où coworker
                            gratuitement et tu souhaites le partager à la
                            communauté. Tu es au bon endroit.
                        </p>
                    </div>
                </div>
                <PlacesAutocomplete />
                <div className=' flex items-center rounded-xl border-[1px] border-primary bg-primary/10 p-4'>
                    <Home className='h-16 w-16' />
                    <p className='px-4 text-justify text-sm text-black/80'>
                        Café, hôtel, bibliothèque ou tiers-lieu, rentre le nom
                        de ton nouveau spot préféré dans la barre de recherche
                        ci-dessous et complète le formulaire.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default page;
