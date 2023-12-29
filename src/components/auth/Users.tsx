'use client';

import { useSession } from 'next-auth/react';

async function Users() {
    const { data: session, status, update } = useSession();
    console.log(session);

    return (
        <div>
            <h1>Utilisateur connecté</h1>
            <h1>Profile page </h1>
            <p>welcome to {session?.user.username} </p>
            <p>Vous coworkez à {session?.user.city} </p>
            <p>Votre adresse mail est {session?.user.email} </p>
            <p>Vous avez les accès : {session?.user.role}</p>
        </div>
    );
}

export default Users;
