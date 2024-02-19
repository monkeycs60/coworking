import { EstablishmentType } from '@prisma/client';

export type LastCoworking = {
    id: string;
    name: string;
    address: string;
    city: string;
    reviews: {
        id: string;
        calmRating: number;
        equipRating: number;
        foodRating: number;
        feelingRating: number;
    }[];
    establishmentType: EstablishmentType | null;
    espressoPrice?: string | null;
    imageSelectedUrls: { url: string }[];
    createdAt: Date;
    placeId: string;
    user: {
        id: string;
        username: string | null;
        email?: string | null;
    };
};
