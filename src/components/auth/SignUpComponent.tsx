'use client';

import { useForm } from 'react-hook-form';
import { SignUpData, SignUpSchema } from '@/schemas/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { useRouter } from 'next/navigation';
import { useToast } from '../ui/use-toast';

const SignUpComponent = () => {
    const router = useRouter();
    const { toast } = useToast();

    const { registerUser, error } = useRegisterUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpData>({
        resolver: zodResolver(SignUpSchema),
    });

    const onSubmit = async (data: SignUpData) => {
        try {
            const responseData = await registerUser(data);
            console.log(responseData);
            // router.push('/profile');
        } catch (error) {
            console.error(error);
            toast({
                title: 'Erreur',
                description: 'Problème lors de la création du compte',
                variant: 'destructive',
            });
        }
    };

    return (
        <section className='mt-[80px] 3xl:mt-[100px]'>
            <form onSubmit={handleSubmit(onSubmit)} className='m-auto mt-8 flex w-1/3 flex-col gap-2 rounded-2xl bg-white p-6 text-black'>
                <h2 className='text-xl font-semibold italic'>Coworker Malin</h2>
                <div className='m-auto h-[1px] w-full bg-slate-300'></div>
                <h1 className='font-light'>Inscription</h1>
                <div className='mt-2 flex flex-col gap-1'>
                    <label className='text-xs' htmlFor='city'>Ville où vous comptez coworker</label>
                    <input {...register('city')} className='rounded-2xl border-[1px] border-slate-300 p-2 ' placeholder='Bordeaux' />
                    {errors.city && <p>{errors.city.message}</p>}
                </div>

                <div className='mt-2 flex flex-col gap-1'>
                    <label className='text-xs' htmlFor='username'>Nom d'utilisateur</label>
                    <input {...register('username')} className='rounded-2xl border-[1px] border-slate-300 p-2 ' placeholder='utilisateur123' />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div className='mt-2 flex flex-col gap-1'>
                    <label className='text-xs' htmlFor='email'>Email</label>
                    <input {...register('email')} className='rounded-2xl border-[1px] border-slate-300 p-2 ' placeholder='mon@mail.fr' />
                    {errors.email && <p>Adresse mail invalide</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-xs' htmlFor='password'>Mot de passe</label>
                    <input
                        className='rounded-2xl border-[1px] border-slate-300 p-2 '
                        {...register('password')}
                        placeholder='********'
                        type='password'
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-xs' htmlFor='confirmPassword'>Confirmez votre mot de passe</label>
                    <input
                        className='rounded-2xl border-[1px] border-slate-300 p-2 '
                        {...register('confirmPassword')}
                        placeholder='Confirmez votre mot de passe'
                        type='password'
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
                </div>


                <input type='submit' />

                {error && <p>{error}</p>}
            </form>
        </section>
    );
};

export default SignUpComponent;
