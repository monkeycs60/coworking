import { ContactSchemaType } from "@/types/contact";

export async function sendContactMail(data: ContactSchemaType) {
	const response = await fetch('/api/contact', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	return response;
}
