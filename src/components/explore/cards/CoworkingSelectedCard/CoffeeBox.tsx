import { Coffee, Euro } from 'lucide-react';

const CoffeeBox = ({ expressoPrice }: { expressoPrice?: string | number }) => {
    const expressoPriceToNumber = Number(expressoPrice);

    return expressoPrice ? (
        <div className='relative flex h-full w-[25%] flex-col items-center justify-center rounded-xl border-[2px] p-2'>
            <Coffee />
            <p>Prix d'un expresso</p>
            <p>{expressoPrice} €</p>
            <div className='absolute right-2 top-2 flex'>
                {expressoPriceToNumber <= 1.5 ? (
                    <Euro className='h-4 w-4 text-secondary' />
                ) : expressoPriceToNumber <= 2.5 ? (
                    <>
                        <Euro className='h-4 w-4 text-secondary' />
                        <Euro className='h-4 w-4 text-secondary' />
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
        <div className='relative flex h-full w-[25%] flex-col items-center justify-center border-[1px] '>
            <Coffee className='absolute left-4 top-4' />
            <p>Prix d'un expresso</p>
            <p>Prix indisponible</p>
        </div>
    );
};

export default CoffeeBox;
