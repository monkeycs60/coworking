'use client';

import { useState } from 'react';
import { UserFormData } from '../schemas/userSchema';

export const useRegisterUser = () => {
    const [error, setError] = useState<string>('');

    const registerUser = async (data: UserFormData) => {
        // Normalisez la valeur de la ville
        const normalizedCity = data.city.trim().toLowerCase();
        const capitalizedCity =
            normalizedCity.charAt(0).toUpperCase() + normalizedCity.slice(1);
        data.city = capitalizedCity;

        try {
            const response = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message || 'Something went wrong');
            }

            return responseData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            }
            throw error;
        }
    };

    return { registerUser, error };
};
