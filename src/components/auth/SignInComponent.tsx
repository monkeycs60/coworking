'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SignInSchema, SignInData } from '@/schemas/userSchema';
import { useRouter } from 'next/navigation';
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
            router.push('/admin');
        }
    };

    const googleSignIn = async () => {
        try {
            setWaitingToSubmit(true);
            await signIn('google', { callbackUrl: '/admin' });
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
            <LoaderButton
                buttonClassName='my-10 w-full lg:h-12 lg:w-[320px] lg:px-4'
                waitingToSubmit={waitingToSubmit}
                buttonMessage='Ajouter ce cowork'
            />
        </form>
    );
};

export default SignInComponent;
