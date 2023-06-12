import NextAuth from 'next-auth/next';
import type { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import EmailProvider from 'next-auth/providers/email';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

const authOptions: NextAuthOptions = {
	providers: [
		EmailProvider({
			server: {
				host: process.env.EMAIL_SERVER_HOST,
				port: process.env.EMAIL_SERVER_PORT,
				auth: {
					user: process.env.EMAIL_SERVER_USER,
					pass: process.env.EMAIL_SERVER_PASSWORD,
				},
			},
			from: process.env.EMAIL_FROM,
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
		CredentialsProvider({
			name: 'Inscrivez-vous',
			// `credentials` is used to generate a form on the sign in page.
			// You can specify which fields should be submitted, by adding keys to the `credentials` object.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'votre-adresse@mail.fr',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}
				// Fetch the user by email from our database using Prisma
				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					// If the user was not found, return null to indicate that authorization failed
					return null;
				}

				if (user && user.password && credentials) {
					// If the user was found, compare the provided password with the one in our database
					const isValid = await bcrypt.compare(
						credentials.password,
						user.password
					);

					if (!isValid) {
						// If the passwords do not match, return null to indicate that authorization failed
						return null;
					}
				}

				// If the passwords do match, return the user object to indicate that authorization was successful
				return user;
			},
		}),
	],
	adapter: PrismaAdapter(prisma), // Ajoutez l'adaptateur ici
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
