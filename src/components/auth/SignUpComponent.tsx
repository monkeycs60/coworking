'use client';

import { useForm } from 'react-hook-form';
import { UserFormData, UserFormSchema } from '@/schemas/userSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUser } from '@/hooks/useRegisterUser';
import { useRouter } from 'next/navigation';

const SignUpComponent = () => {
    const router = useRouter();
    const { registerUser, error } = useRegisterUser();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(UserFormSchema),
    });

    const onSubmit = async (data: UserFormData) => {
        try {
            const responseData = await registerUser(data);
            console.log(responseData);
            router.push('/profile');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col border-2 border-black p-12'
        >
            <input {...register('city')} placeholder='Ville' />
            {errors.city && <p>{errors.city.message}</p>}

            <input {...register('username')} placeholder='Username' />
            {errors.username && <p>{errors.username.message}</p>}

            <input {...register('email')} placeholder='Email' />
            {errors.email && <p>Adresse mail invalide</p>}

            <input
                {...register('password')}
                placeholder='Password'
                type='password'
            />
            {errors.password && <p>{errors.password.message}</p>}

            <input
                {...register('confirmPassword')}
                placeholder='Confirm Password'
                type='password'
            />
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

            <input type='submit' />

            {error && <p>{error}</p>}
        </form>
    );
};

export default SignUpComponent;
