import NextAuth from 'next-auth';

declare module 'next-auth' {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface User {
        username: string; 
        email: string;
        city: string;
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
