import { Providers } from '@/redux/provider';
import './globals.css';
import AuthProvider from './AuthProvider';
import NavBar from './NavBar';

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
		<AuthProvider>
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
		</AuthProvider>
	);
}
