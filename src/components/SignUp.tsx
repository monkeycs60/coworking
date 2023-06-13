import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { revalidatePath } from 'next/cache';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
	async function newUser(formData: FormData) {
		'use server';
		const email = formData.get('email');
		const password = formData.get('password');

		if (typeof email !== 'string' || typeof password !== 'string') {
			console.log('email or password is not a string');
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			await prisma.user.create({
				data: {
					email: email,
					password: hashedPassword,
					name: email,
					image: '/black_dot.png',
				},
			});
			console.log('new user created');
			// const result = await signIn('credentials', {
			// 	email: email,
			// 	password: password,
			// 	callbackUrl: '/',
			// });

			// console.log('résultat', result);
		}
	}
	return (
		<form action={newUser}>
			<input type='email' name='email' placeholder='Email' required />
			<input
				type='password'
				name='password'
				placeholder='Password'
				required
			/>
			<button type='submit'>Sign Up</button>
		</form>
	);
}
