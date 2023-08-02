import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';
import { ContactSchemaType } from '@/types/contact';

const transporter = nodemailer.createTransport({
	host: 'smtp.sendgrid.net', // Replace this with your Amazon SES SMTP endpoint
	port: 587,
	secure: false, // true for 465, false for other ports
	auth: {
		user: process.env.EMAIL_SERVER_USER,
		pass: process.env.EMAIL_SERVER_PASSWORD,
	},
});

export async function POST(req: NextRequest) {
	if (req.body) {
		const res = (await req.json()) as ContactSchemaType; // res now contains body
		const { email, subject, message } = res;

		const mailData = {
			from: 'noreply@coworkezmalin.com',
			to: ['clement.serizay@gmail.com'],
			subject: subject,
			text: message,
			html: `
		<div style="font-family: Arial, sans-serif; margin: 0; padding: 0; box-sizing: border-box;">
			<div style="padding: 20px; background-color: #f7f7f7;">
				<h2 style="font-size: 20px; color: #333;">Message from Coworkezmalin.com</h2>
				<div style="margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
					<p style="font-size: 16px; line-height: 1.5; color: #333;">
						<strong style="color: #777;">From:</strong> ${email}
					</p>
					<p style="font-size: 16px; line-height: 1.5; color: #333;">
						<strong style="color: #777;">Subject:</strong> ${subject}
					</p>
					<p style="font-size: 16px; line-height: 1.5; color: #333;">
						<strong style="color: #777;">Message:</strong>
					</p>
					<p style="font-size: 16px; line-height: 1.5; color: #333;">
						${message}
					</p>
				</div>
			</div>
		</div>
	`,
		};

		try {
			await transporter.sendMail(mailData);
			return NextResponse.json({ message: 'ok email sent' });
		} catch (error) {
			console.log('error', error);
			return NextResponse.json({ error: error });
		}
	} else {
		return NextResponse.json({ error: 'no body' });
	}
}
