'use client';

import { Button } from '@/components/ui/button';
import ModalWindow from '@/components/ui/modalWindow';
import { Coffee, Euro, Pencil } from 'lucide-react';
import { useState } from 'react';

interface CoffeeBoxProps {
    expressoPrice?: string | number;
    coworkingPlaceId?: string;
}

const CoffeeBox = ({ expressoPrice, coworkingPlaceId }: CoffeeBoxProps) => {
    const [newPrice, setNewPrice] = useState<string | number | null>(null);

    // Modal handler
    const [isOpen, setIsOpen] = useState(false);

    // Create a function to open the modal
    const handleOpen = () => {
        setIsOpen(true);
    };

    // Create a function to close the modal
    const handleClose = () => {
        setIsOpen(false);
    };


    const expressoPriceToNumber = Number(expressoPrice);
    
    // create a PUT request to update the expresso price
    const updateExpressoPrice = async () => {
        const res = await fetch('/api/expresso', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                expressoPrice: newPrice,
                placeId: coworkingPlaceId,
            }),
        });
        const data = await res.json();
        console.log(data);
    };

    return expressoPrice ? (
        <div className='relative flex h-full w-full items-center justify-end gap-10 rounded-xl border-[2px] p-4 lg:w-[25%] lg:flex-col lg:justify-center lg:gap-1 lg:p-2'>
            <p className='text-sm'>Prix d'un expresso</p>
            <div className='flex items-center gap-1 lg:gap-3'>
                <Coffee />
                <p>{expressoPrice} €</p>
            </div>
            <Pencil
                className='absolute right-3 top-5 h-4 w-4 cursor-pointer text-gray-500 hover:scale-110 hover:text-black lg:right-3 lg:top-2'
                onClick={handleOpen}
            />
            <ModalWindow
                isOpen={isOpen}
                onClose={handleClose}
                containerClass='w-[320px] lg:w-[500px] lg:text-base text-xs'
            >
                <div className='flex h-[250px] w-[600px] flex-col items-center justify-between py-6'>
                    <h3 className='text-xl font-semibold'>
                        Modifie le prix de l'expresso
                    </h3>
                    <div className='flex flex-col items-center gap-4'>
                        <div className='flex items-center gap-2'>
                            <input
                                type='text'
                                className='border-[1px] p-2 '
                                value={newPrice || ''}
                                onChange={(e) => setNewPrice(e.target.value)}
                            />
                            <Euro className='h-4 w-4 text-black' />
                        </div>
                        <Button
                            onClick={() => {
                                updateExpressoPrice();
                                handleClose();
                            }}
                        >
                            Valider
                        </Button>
                    </div>
                </div>
            </ModalWindow>
            <div className='absolute left-3 top-5 flex w-1/3 lg:right-2 lg:top-2'>
                {expressoPriceToNumber <= 1.5 ? (
                    <>
                        <Euro className='h-4 w-4 text-secondary' />
                        <Euro className='h-4 w-4 text-gray-500' />
                        <Euro className='h-4 w-4 text-gray-500' />
                    </>
                ) : expressoPriceToNumber <= 2.5 ? (
                    <>
                        <Euro className='h-4 w-4 text-secondary' />
                        <Euro className='h-4 w-4 text-secondary' />
                        <Euro className='h-4 w-4 text-gray-500' />
                    </>
                ) : (
                    <>
                        <Euro className='h-4 w-4 text-secondary' />
                        <Euro className='h-4 w-4 text-secondary' />
                        <Euro className='h-4 w-4 text-secondary' />
                    </>
                )}
            </div>
        </div>
    ) : (
        <div className='relative flex h-full w-full items-center justify-between gap-1 rounded-xl border-[2px] p-4 lg:w-[25%] lg:flex-col lg:justify-center lg:p-2'>
            <p className='text-sm'>Prix d'un expresso</p>
            <div className='flex items-center gap-3'>
                <Coffee />
                <p>Indisponible</p>
            </div>
        </div>
    );
};

export default CoffeeBox;
