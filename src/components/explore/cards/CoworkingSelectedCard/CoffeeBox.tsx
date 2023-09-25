import { Coffee, Euro } from 'lucide-react';

const CoffeeBox = ({ expressoPrice }: { expressoPrice?: string | number }) => {
    const expressoPriceToNumber = Number(expressoPrice);

    return expressoPrice ? (
        <div className='relative flex h-full w-full items-center gap-10 rounded-xl border-[2px] p-4 lg:w-[25%] lg:flex-col lg:justify-center lg:gap-1 lg:p-2'>
            <p className='text-sm'>Prix d'un expresso</p>
            <div className='flex items-center gap-1 lg:gap-3'>
                <Coffee />
                <p>{expressoPrice} €</p>
            </div>
            <div className='absolute right-2 top-5 flex lg:top-2'>
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
        <div className='relative flex h-full w-[25%] flex-col items-center justify-center gap-1 rounded-xl border-[2px] p-2'>
            <p className='text-sm'>Prix d'un expresso</p>
            <div className='flex items-center gap-3'>
                <Coffee />
                <p>Indisponible</p>
            </div>
        </div>
    );
};

export default CoffeeBox;
