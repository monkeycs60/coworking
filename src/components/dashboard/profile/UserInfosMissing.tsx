'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    UserMoreInfosSchema,
    UserMoreInfosData,
} from '@/schemas/userApiSchema';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { useSession } from 'next-auth/react';

const UserInfosMissing = () => {
    const { data: session, status, update } = useSession();
    const { toast } = useToast();
    const router = useRouter();
    const city = session?.user.city;
    const username = session?.user.username;

    if (city && username) {
        router.push('/profile');
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserMoreInfosData>({
        resolver: zodResolver(UserMoreInfosSchema),
    });

    const onSubmit = async (data: UserMoreInfosData) => {
        console.log(data);
        try {
            const responseData = await fetch('/api/users', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            console.log(responseData);

            if (!responseData.ok) {
                throw new Error("Erreur lors de l'envoi des données");
            } else {
                const { user } = await responseData.json();
                console.log(user);
                await update({
                    ...session,
                    user: {
                        ...session?.user,
                        city: user.city,
                        username: user.username,
                    },
                });
                router.push('/profile');
            }
        } catch (error) {
            console.error(error);
            toast({
                title: 'Erreur',
                description: "Problème lors de l'envoi des données",
                variant: 'destructive',
            });
        }
    };

    return (
        <div className='flex h-screen flex-col items-center justify-center'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='flex flex-col border-2 border-black p-12'
            >
                <input
                    {...register('city')}
                    placeholder='Ville'
                    className='border-2 border-black'
                />
                {errors.city && <p>{errors.city.message}</p>}

                <input
                    {...register('username')}
                    placeholder='Username'
                    className='border-2 border-black'
                />
                {errors.username && <p>{errors.username.message}</p>}

                <button
                    type='submit'
                    className='mt-4 border-2 border-black p-2'
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
};
export default UserInfosMissing;
