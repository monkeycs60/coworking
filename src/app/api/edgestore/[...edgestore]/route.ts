import { initEdgeStore } from '@edgestore/server';
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app';
import { AWSProvider } from '@edgestore/server/providers/aws';

const es = initEdgeStore.create();

/**
 * This is the main router for the Edge Store buckets.
 */
const edgeStoreRouter = es.router({
    publicImages: es.imageBucket(
        {
            maxSize: 1024 * 1024 * 10, // 10MB

        }
    ),

});

const handler = createEdgeStoreNextHandler({
    provider: AWSProvider({
        accessKeyId: process.env.ACCESS_KEY_ID_AWS,
        secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS,
        region: process.env.REGION_AWS,
        bucketName: 'coworking-malin-bucket',
    }),
    router: edgeStoreRouter,
});

export { handler as GET, handler as POST };

/**
 * This type is used to create the type-safe client for the frontend.
 */
export type EdgeStoreRouter = typeof edgeStoreRouter;