'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, signOut } from 'next-auth/react';
import { SignInSchema, SignInData } from '@/schemas/userSchema';
import { redirect, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import LoaderButton from '../ui/LoaderButton';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SignInComponent = () => {
    const [waitingToSubmit, setWaitingToSubmit] = useState(false);

    const router = useRouter();
    const { toast } = useToast();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInData>({
        resolver: zodResolver(SignInSchema),
    });

    const onSubmit = async (data: SignInData) => {
        const signInData = await signIn('credentials', {
            redirect: false,
            email: data.email,
            password: data.password,
        });

        if (signInData?.error) {
            toast({
                title: 'Erreur',
                description: 'Email ou mot de passe incorrect',
                variant: 'destructive',
            });
        } else {
            console.log(signInData);
            router.push('/profile');
        }
    };

    const googleSignIn = async () => {
        try {
            setWaitingToSubmit(true);
            await signIn('google', {
                callbackUrl: '/profile/firstLoginInfos',
            });
        } catch (error) {
            console.error(error);
            setWaitingToSubmit(false);
        } finally {
            setWaitingToSubmit(false);
        }
    };

    return (
        <section className='mt-[80px] 3xl:mt-[100px]'>
            <form onSubmit={handleSubmit(onSubmit)} className='m-auto mt-8 flex w-1/3 flex-col gap-2 rounded-2xl bg-white p-6 text-black'>
                <h2 className='text-xl font-semibold italic'>Coworker Malin</h2>
                <div className='m-auto h-[1px] w-full bg-slate-300'></div>
                <h1 className='font-light'>Connexion</h1>
                <div className='mt-6 flex flex-col gap-1'>
                    <label className='text-xs' htmlFor='email'>Email</label>
                    <input className='rounded-2xl border-[1px] border-slate-300 p-2 ' placeholder='mon@mail.fr' type='email' {...register('email')} />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div className='flex flex-col gap-1'>
                    <label className='text-xs' htmlFor='password'>Mot de passe</label>
                    <input className='rounded-2xl border-[1px] border-slate-300 p-2 ' placeholder='********' type='password' {...register('password')} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type='submit' className='m-auto my-2 w-2/3 rounded-2xl bg-primary px-8 py-2 font-semibold text-white hover:bg-primary/70'>Connectez-vous</button>
                <div className='mt-2 justify-center text-center text-sm'>
                    <span>Vous n'êtes pas encore inscrit ? </span>
                    <Link href='/sign-up' className='font-semibold underline'>Inscrivez-vous</Link>
                </div>
                <div className='m-auto my-3 h-[1px] w-full bg-slate-300'></div>
                <button
                    type='button'
                    onClick={googleSignIn}
                    className='m-auto my-2 flex w-2/3 items-center justify-between rounded-2xl border-2 bg-slate-100 px-8 py-2 hover:bg-slate-300'
                >
                    <span>Se connecter avec Google</span>
                    <Image src='/images/google.svg' alt='google icon' width={20} height={20} />
                </button>
            </form>
        </section>
    );
};

export default SignInComponent;
