import NextAuth from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        username: string | null; 
        email: string | null;
        city: string | null;
    }

    interface Session {
            user: User & {
                id: string;
                email: string;
                username: string;
                city: string;
            };
            token: {
                id: string;
                email: string;
                username: string;
                city: string;
            };
    }
}
