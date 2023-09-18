import React from 'react';

interface SuccessProps {
    children: React.ReactNode;
}

const Success = ({ children }: SuccessProps) => {
    return (
        <div className='h-screen w-screen items-center justify-center gap-16'>
            <h1>FELICITATIONS !</h1>
            <div className='flex flex-col gap-3'>
                <p>{children}</p>
                <p>Rajouté avec succès !!!</p>
            </div>
            <div>Continue ta navigation ici :</div>
        </div>
    );
};

export default Success;
