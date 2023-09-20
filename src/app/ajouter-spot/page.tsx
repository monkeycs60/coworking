import PlacesAutocomplete from '@/components/maps/PlacesAutocomplete';
import { Info, Home } from 'lucide-react';

const page = () => {
    return (
        <section className='mt-12 min-h-[500px] p-4 lg:mt-32 lg:p-10 xl:mt-48 3xl:mt-64 '>
            <div className='mt-4 flex flex-col justify-center gap-12 text-center'>
                <div className='relative m-auto flex w-full items-center gap-4 rounded-xl border-[1px] border-primary bg-primary/10 px-4 py-8 lg:w-2/3'>
                    <Info className='absolute left-4 top-10 h-6 w-6 text-black' />
                    <div className='flex flex-col gap-4 p-2'>
                        <p className='flex flex-col gap-3 pl-8 pr-2 text-justify text-sm text-black/80'>
                            <span>
                                Café, hôtel, bibliothèque ou tiers-lieu, tu
                                souhaites ajouter un nouveau spot à la base de
                                données ?
                            </span>
                            <span>
                                Rentre le nom du lieu dans la barre de recherche
                                ci-dessous, sélectionne le lieu dans la liste et
                                complète le formulaire.
                            </span>
                        </p>
                    </div>
                </div>
                <PlacesAutocomplete />
            </div>
        </section>
    );
};

export default page;
