import { Providers } from '@/redux/provider';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';
import NavBar from './NavBar';

export const metadata = {
	title: 'Coworkez Malin',
	description: 'Trouve ton coworking gratuit',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider localization={frFR}>
			<html lang='fr'>
				<body className='w-screen overflow-x-hidden'>
					<Providers>
						<div className='container'>
							<NavBar />
							{children}
						</div>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
