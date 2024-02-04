"use client"

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import { Swiper as SwiperType } from 'swiper/types';

const cards = [
    {
        title: 'Flexibilité',
        firstParagraph: "Vous voulez découvrir le coworking, tester de nouvelles adresses ou trouver un endroit au calme où travailler dans une ville inconnue, alors vous êtes au bon endroit.",
        secondParagraph: "Venez profiter sans prise de tête et sans engagement de nos établissements répertoriés. Travaillez où vous voulez, quand vous voulez et avec qui vous voulez.",
    },
    {
        title: 'Partage',
        firstParagraph: "Ici, vous pourrez découvrir tous les lieux que notre communauté a jugé coworking friendly. Cafés, lobbies d’hôtel, bibliothèques, tiers-lieux, vous trouverez les endroits les plus propices au coworking.",
        secondParagraph: "Mais la communauté, c’est aussi  vous ! Alors n’hésitez pas à laisser des reviews et à ajouter de nouveaux lieux."
    },
    {
        title: 'Gratuité',
        firstParagraph: "La philosophie qui nous anime, c’est la gratuité. Pas de frais d’abonnement, pas de coûts de mise en relation. Votre seul investissement, c’est votre café latte.",
        secondParagraph: "Nous visons à référencer tous les lieux qui accueillent avec bienveillance les coworkers, sans aucune contrepartie financière. Si ce n’est une consommation."
    },
];

const Features = () => {
    const [activeCard, setActiveCard] = useState(0);

    return (
        <div className="feature-bg container mx-auto mt-16 px-4 py-16">
            <div className="hidden md:block">
                {/* Desktop View */}
                <DesktopView cards={cards} activeCard={activeCard} setActiveCard={setActiveCard} />
            </div>
            <div className="block md:hidden">
                {/* Mobile View */}
                <MobileView cards={cards}
                    activeCard={activeCard}
                    setActiveCard={setActiveCard} />
            </div>
        </div>
    )
}

export default Features

interface CardProps {
    title: string;
    firstParagraph: string;
    secondParagraph: string;
}

interface DesktopViewProps {
    cards: CardProps[];
    activeCard: number;
    setActiveCard: (index: number) => void;
}

export const DesktopView: React.FC<DesktopViewProps> = ({ cards }) => {
    return (
        <div className="flex flex-col justify-center space-x-4">
            <div>
                <h2>Le concept Coworker Malin</h2>
                <h3>Le coworking n’a jamais été aussi accessible !</h3>
            </div>
            <div className='flex justify-center space-x-4'>
                {cards.map((card, index) => (
                    <div key={index} className="max-w-md rounded-lg border border-gray-300 p-4 shadow-lg">
                        <h2 className="mb-3 text-xl font-semibold">{card.title}</h2>
                        <div>
                            <p>{card.firstParagraph}</p>
                            <p>{card.secondParagraph}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
interface MobileViewProps {
    cards: CardProps[];
    activeCard: number;
    setActiveCard: (index: number) => void;
}


export const MobileView: React.FC<MobileViewProps> = ({ cards }) => {
    const [activeCard, setActiveCard] = useState(0);
    const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

    const navigateToSlide = (index: number) => {
        if (swiperRef !== null) {
            swiperRef.slideTo(index);
        }
    };

    useEffect(() => {
        if (swiperRef) {
            const changeHandler = (swiper: SwiperType) => {
                setActiveCard(swiper.activeIndex);
            };

            swiperRef.on('slideChange', changeHandler);
            return () => {
                swiperRef.off('slideChange', changeHandler);
            };
        }
    }, [swiperRef]);

    return (
        <>
            <Swiper
                onSwiper={setSwiperRef}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(swiper) => console.log(`slide changed to: ${swiper.activeIndex}`)}
            >
                {cards.map((card, index) => (
                    <SwiperSlide key={index}>
                        <div className="rounded-lg border border-gray-300 p-4 shadow-lg">
                            <h2 className="mb-3 text-xl font-semibold">{card.title}</h2>
                            <div>
                                <p>{card.firstParagraph}</p>
                                <p>{card.secondParagraph}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="mt-4 flex justify-center">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        className={`mx-2 h-4 w-4 rounded-full ${swiperRef?.activeIndex === index ? 'bg-blue-500' : 'bg-gray-300'}`}
                        onClick={() => navigateToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </>
    );
};