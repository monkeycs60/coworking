import { Check, HelpCircle } from 'lucide-react';
import React from 'react';
import { Coworking } from '@/types/coworking';

interface CharacteristicSectionProps {
    title: string;
    children: React.ReactNode;
}

const NoInfoAvailable = () => {
    return (
        <div className='flex gap-4'>
            <HelpCircle />
            <h3 className='mb-3 text-sm italic'>
                Aucune information disponible
            </h3>
        </div>
    );
};

const CharacteristicSection = ({
    title,
    children,
}: CharacteristicSectionProps) => {
    const hasChildren = React.Children.toArray(children).length > 0;

    return (
        <div className='w-[230px]'>
            <h3 className='mb-3 italic'>{title}</h3>
            {hasChildren ? children : <NoInfoAvailable />}
        </div>
    );
};

const CharacteristicItem = ({ label }: { label: string }) => (
    <div className='flex gap-4'>
        <Check />
        <span>{label}</span>
    </div>
);

const Characteristics = ({ coworking }: { coworking: Coworking }) => {
    console.log(coworking);

    return (
        <div className='rounded-xl border-[2px] p-6'>
            <div className='flex flex-col items-center gap-8 lg:items-start'>
                <h3 className='font-semibold'>Caractéristiques</h3>
                <div className='flex flex-wrap gap-[50px]'>
                    <CharacteristicSection title='Accès et espaces'>
                        {coworking?.hasExterior && (
                            <CharacteristicItem label='Extérieur' />
                        )}
                        {coworking?.hasParking && (
                            <CharacteristicItem label='Parking' />
                        )}
                        {coworking?.hasHandicap && (
                            <CharacteristicItem label='Accès handicapé' />
                        )}
                    </CharacteristicSection>
                    <CharacteristicSection title='Commodités sur place'>
                        {coworking?.hasPrivacy && (
                            <CharacteristicItem label=' Coin privé / isolé' />
                        )}
                        {coworking?.hasWiFi && (
                            <CharacteristicItem label='Wifi' />
                        )}
                        {coworking?.hasPlugs && (
                            <CharacteristicItem label='Prises électriques' />
                        )}
                    </CharacteristicSection>
                    <CharacteristicSection title='Qualité du Wi-Fi'>
                        {coworking?.wifiQuality === 'HIGH_WIFI' && (
                            <CharacteristicItem label='Elévée' />
                        )}
                        {coworking?.wifiQuality === 'MEDIUM_WIFI' && (
                            <CharacteristicItem label='Moyenne' />
                        )}
                        {coworking?.wifiQuality === 'LOW_WIFI' && (
                            <CharacteristicItem label='Faible' />
                        )}
                    </CharacteristicSection>
                    <CharacteristicSection title='Zone de travail'>
                        {coworking?.smallTables && (
                            <CharacteristicItem label='Petites tables' />
                        )}
                        {coworking?.largeWorktables && (
                            <CharacteristicItem label='Grandes tables de travail' />
                        )}
                        {coworking?.standingTables && (
                            <CharacteristicItem label='Tables hautes / mange debout' />
                        )}
                        {coworking?.counterSeats && (
                            <CharacteristicItem label='Comptoir/bar' />
                        )}
                    </CharacteristicSection>
                    <CharacteristicSection title='Adapté pour coworker en'>
                        {coworking?.soloCoworker && (
                            <CharacteristicItem label='Solo' />
                        )}
                        {coworking?.smallGroup && (
                            <CharacteristicItem label='Petit groupe' />
                        )}
                        {coworking?.bigGroup && (
                            <CharacteristicItem label='Grand groupe' />
                        )}
                    </CharacteristicSection>
                    <CharacteristicSection title='Moment idéal'>
                        {coworking?.morningDuration && (
                            <CharacteristicItem label='Le matin' />
                        )}
                        {coworking?.afternoonDuration && (
                            <CharacteristicItem label="L'après-midi" />
                        )}
                        {coworking?.fullDuration && (
                            <CharacteristicItem label='La journée entière' />
                        )}
                    </CharacteristicSection>
                    <CharacteristicSection title='Offre bar/restauration'>
                        {coworking?.snacksPossibility && (
                            <CharacteristicItem label='Collations' />
                        )}
                        {coworking?.lunchPossibility && (
                            <CharacteristicItem label='Déjeuner' />
                        )}
                        {coworking?.souperPossibility && (
                            <CharacteristicItem label='Dîner' />
                        )}
                        {coworking?.drinksPossibility && (
                            <CharacteristicItem label='Boissons froides & chaudes' />
                        )}
                        {coworking?.alcoolPossibility && (
                            <CharacteristicItem label='Boissons alcoolisées' />
                        )}
                    </CharacteristicSection>
                    <CharacteristicSection title='Musique'>
                        {coworking?.music === 'NO_MUSIC' && (
                            <CharacteristicItem label='Absente' />
                        )}
                        {coworking?.music === 'DISCRETE_MUSIC' && (
                            <CharacteristicItem label='Discrète' />
                        )}
                        {coworking?.music === 'RANDOM_MUSIC' && (
                            <CharacteristicItem label='Ca dépend' />
                        )}
                        {coworking?.music === 'LOUD_MUSIC' && (
                            <CharacteristicItem label='Bruyante' />
                        )}
                    </CharacteristicSection>
                </div>
            </div>
        </div>
    );
};

export default Characteristics;
