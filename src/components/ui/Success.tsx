import Link from 'next/link';
import React from 'react';

interface SuccessProps {
    children: React.ReactNode;
}

const Success = ({ children }: SuccessProps) => {
    return (
        <div className='mx-auto my-[100px] flex h-[500px] w-1/2 flex-col items-center justify-center gap-16 rounded-xl bg-gray-200 font-inter'>
            <h1 className='text-2xl font-semibold'>FELICITATIONS !</h1>
            <div className='flex gap-1'>
                {children}
                <p>ajouté avec succès !!!</p>
            </div>
            <div>
                Continue ta navigation
                <Link href='/explore' className='ml-1 font-semibold underline'>
                    ici
                </Link>
            </div>
            <div>
                Tu souhaites ajouter un nouveau coworking ? Clique
                <Link
                    href='/ajouter-spot'
                    className='ml-1 font-semibold underline'
                >
                    ici
                </Link>
            </div>
        </div>
    );
};

export default Success;
