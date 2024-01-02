import { Providers } from '@/redux/provider';
import AuthProvider from '@/components/auth/AuthProvider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { EdgeStoreProvider } from '@/lib/edgestore';

import NavBar from '../components/layout/NavBar';
import Footer from '@/components/layout/Footer';

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
        <html lang='fr'>
            <body className='m-auto flex max-w-[1200px] justify-center overflow-x-hidden font-inter 2xl:max-w-[1400px]'>
                <AuthProvider>
                    <Providers>
                        <EdgeStoreProvider>
                            <div className='w-full'>
                                <NavBar />
                                {children}
                                <Footer />
                            </div>
                            <Toaster />
                        </EdgeStoreProvider>
                    </Providers>
                </AuthProvider>
            </body>
        </html>
    );
}
