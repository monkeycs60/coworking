import './globals.css';

export const metadata = {
	title: 'Coworking Pro',
	description: 'Trouve ton coworking gratuit',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='fr'>
			<body className='w-screen overflow-x-hidden'>{children}</body>
		</html>
	);
}
