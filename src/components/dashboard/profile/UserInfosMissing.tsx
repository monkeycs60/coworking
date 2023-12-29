'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const UserInfosMissing = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const city = session?.user.city;
    const username = session?.user.username;

    if (city && username) {
       router.push('/profile');
    }

    return <div>UserInfosMissing</div>;
};

export default UserInfosMissing;
