'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn, signOut } from 'next-auth/react';
import { SignInSchema, SignInData } from '@/schemas/userSchema';
import { redirect, useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import LoaderButton from '../ui/LoaderButton';
import { useState } from 'react';

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
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
            <label>
                Email
                <input type='email' {...register('email')} />
                {errors.email && <p>{errors.email.message}</p>}
            </label>

            <label>
                Mot de passe
                <input type='password' {...register('password')} />
                {errors.password && <p>{errors.password.message}</p>}
            </label>

            <button type='submit'>Sign In</button>

            <button
                type='button'
                onClick={googleSignIn}
                className='m-auto mt-6 w-1/2 border-2 bg-slate-400'
            >
                Sign In with Google
            </button>
            <button onClick={() => signOut()}>Se déconnecter</button>
        </form>
    );
};

export default SignInComponent;
