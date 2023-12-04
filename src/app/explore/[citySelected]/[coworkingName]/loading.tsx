import Image from 'next/image';

const loading = () => {
    return (
        <div className='absolute left-1/2 top-1/2 flex h-[500px] w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center 2xl:h-[600px] 3xl:h-[800px]'>
            <div className='flex h-full w-full flex-col items-center justify-center gap-8'>
                <Image
                    src='/logosvg.svg'
                    width={1432}
                    height={467}
                    className='w-[200px] lg:w-[400px] 2xl:w-[600px] 3xl:w-[900px]'
                    alt='coworking logo'
                />
                <h2 className='animate-ping text-xl lg:text-3xl'>
                    Ajout du coworking en cours
                </h2>
            </div>
        </div>
    );
};

export default loading;
