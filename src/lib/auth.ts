import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from './prisma';
import { compare } from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/sign-in',
        signOut: '/auth/signout',
        error: '/auth/error', // Error code passed in query string as ?error=
        verifyRequest: '/auth/verify-request', // (used for check email message)
        newUser: undefined, // If set, new users will be directed here on first sign in
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                    username: profile.email, // Use email as username if Google profile does not include a username
                    city: null,
                    role: profile.role ?? 'user', // Default role when signing in with Google
                };
            },
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'text',
                    placeholder: 'michel.dupond@mail.com',
                },
                password: { label: 'Mot de passe', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const existingUser = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (!existingUser) {
                    return null;
                }

                if (existingUser.password) {
                    const passwordValid = await compare(
                        credentials.password,
                        existingUser.password,
                    );
                    if (!passwordValid) {
                        return null;
                    }
                }

                return {
                    id: existingUser.id,
                    email: existingUser.email,
                    username: existingUser.username,
                    city: existingUser.city,
                    role: existingUser.role,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                return {
                    ...token,
                    username: user.username,
                    id: user.id,
                    email: user.email,
                    city: user.city,
                    role: user.role,
                };
            }
            return token;
        },
        async session({ session, token, user }) {
            return {
                ...session,
                user: {
                    id: token.id,
                    email: token.email,
                    username: token.username,
                    city: token.city,
                    role: token.role,
                },
            };
        },
    },
};
