'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { SignInSchema, SignInData } from '@/schemas/userSchema';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

const SignInComponent = () => {
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
                variant: 'destructive'
            });
        } else {
            console.log(signInData);
            router.push('/admin');
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
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

            <button onClick={() => signIn('google')}>
                Sign In with Google
            </button>
        </form>
    );
};

export default SignInComponent;
