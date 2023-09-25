import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
    publicRoutes: [
        '/',
        '/ajouter-spot',
        '/api/contact',
        '/about',
        '/cities/',
        '/explore',
        '/explore/(.*)',
        '/api/clerkWebhook',
    ],
    ignoredRoutes: ['/api/clerkWebhook'],
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
