"use client"

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import { Swiper as SwiperType } from 'swiper/types';

const cards = [
    {
        title: 'Flexibilité',
        firstParagraph: "Vous voulez découvrir le coworking, tester de nouvelles adresses ou trouver un endroit au calme où travailler dans une ville inconnue, alors vous êtes au bon endroit.",
        content:
            <>
                <p>Vous voulez découvrir le coworking, tester de nouvelles adresses ou trouver un endroit au calme où travailler dans une ville inconnue, alors vous êtes au bon endroit.</p>
                <p>Venez profiter sans prise de tête et <strong>sans engagement</strong>  de nos établissements répertoriés. Travaillez où vous voulez, quand vous voulez et avec qui vous voulez.</p>
            </>
    },
    {
        title: 'Partage',
        content:
            <>
                <p>Ici, vous pourrez découvrir tous les lieux que notre communauté a jugé <strong>coworking friendly</strong>. Cafés, lobbies d’hôtel, bibliothèques, tiers-lieux, vous trouverez les endroits les plus propices au coworking.</p>
                <p>Mais la communauté, c’est aussi  <strong>vous</strong> ! Alors n’hésitez pas à laisser des reviews et à ajouter de nouveaux lieux.</p>
            </>
    },
    {
        title: 'Gratuité',
        content:
            <>
                <p>La philosophie qui nous anime, c’est la gratuité. <strong>Pas de frais</strong> d’abonnement, pas de coûts de mise en relation. Votre seul investissement, c’est votre café latte.</p>
                <p>Nous visons à référencer tous les lieux qui accueillent avec bienveillance les coworkers, sans <strong>aucune contrepartie financière</strong>. Si ce n’est une consommation.</p>
            </>
    },
];

const Features = () => {
    const [activeCard, setActiveCard] = useState(0);

    return (
        <div className="feature-bg relative mt-16 w-screen py-12 lg:mb-[100px] lg:h-[58vh]">
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
    content: JSX.Element;
}

interface DesktopViewProps {
    cards: CardProps[];
    activeCard: number;
    setActiveCard: (index: number) => void;
}

export const DesktopView: React.FC<DesktopViewProps> = ({ cards }) => {
    return (
        <div className="flex flex-col justify-center space-x-4">
            <div className='text-center'>
                <h2 className='text-xl font-semibold'>Le concept <span className='font-bold italic'>Coworker Malin</span></h2>
                <h3 className=''>Le coworking n’a jamais été aussi accessible !</h3>
            </div>
            <div className='absolute bottom-[-100px] flex justify-around space-x-4'>
                {cards.map((card, index) => (
                    <div key={index} className="w-1/4 max-w-md rounded-2xl border border-gray-300 bg-white p-4 text-black shadow-lg">
                        <h2 className="mb-3 text-center text-xl font-semibold text-primary">{card.title}</h2>
                        <div className='mt-4 flex flex-col gap-2 px-6 text-center text-sm'>
                            {card.content}
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
            <div className='mb-10 text-center'>
                <h2 className='text-2xl font-semibold'>Le concept <span className='mt-1 block font-bold italic'>Coworker Malin</span></h2>
            </div>
            <Swiper
                onSwiper={setSwiperRef}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={(swiper) => console.log(`slide changed to: ${swiper.activeIndex}`)}
            >
                {cards.map((card, index) => (
                    <SwiperSlide key={index}>
                        <div className="m-auto w-[90%] rounded-2xl border border-gray-300 bg-white p-8 text-black shadow-lg">
                            <h2 className="mb-3 text-center text-xl font-semibold text-primary">{card.title}</h2>
                            <div className='mt-2 flex flex-col gap-2 text-center'>
                                {card.content}
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="mt-4 flex justify-center">
                {cards.map((_, index) => (
                    <button
                        key={index}
                        className={`mx-2 h-4 w-4 rounded-full ${swiperRef?.activeIndex === index ? 'bg-primary' : 'bg-gray-300'}`}
                        onClick={() => navigateToSlide(index)}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </>
    );
};