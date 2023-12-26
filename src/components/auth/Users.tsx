'use client';

import { useSession } from 'next-auth/react';

function Users() {
    const { data: session, status } = useSession();
    console.log(session, status);

    return (
        <div>
            <h1>Utilisateur connecté</h1>
        </div>
    );
}

export default Users;
