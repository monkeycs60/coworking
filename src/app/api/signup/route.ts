import bcrypt from 'bcrypt';
import { prisma } from '../../../lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export async function signup(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	const { email, password } = req.body;

	const existingUser = await prisma.user.findUnique({
		where: { email },
	});

	if (existingUser) {
		return res.status(400).json({ message: 'User already exists' });
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const user = await prisma.user.create({
			data: { email, password: hashedPassword },
		});
		return res
			.status(200)
			.json({ message: 'User created successfully', user });
	} catch (error) {
		return res.status(500).json({ message: 'Something went wrong' });
	}
}
