'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function signUpUser(data: { email: string; password: string }) {
	const { email, password } = data;

	const hashedPassword = await bcrypt.hash(password, 10);

	const user = await prisma.user.create({
		data: {
			email: email,
			password: hashedPassword,
		},
	});

	return user;
}
