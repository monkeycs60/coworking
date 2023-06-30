import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
	publicRoutes: ['/', '/coworking-list'],
});

export const config = {
	matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
