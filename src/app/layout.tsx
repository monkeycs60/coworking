import { Providers } from '@/redux/provider';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { frFR } from '@clerk/localizations';
import NavBar from '../components/layout/NavBar';

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
				<body className='m-auto flex max-w-[1400px] justify-center overflow-x-hidden font-inter'>
					<Providers>
						<div className=''>
							<NavBar />
							{children}
						</div>
					</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
