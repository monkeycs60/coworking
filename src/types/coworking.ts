export interface Coworking {
    id: string;
    userId?: string | null;
    placeId?: string | null;
    longitude?: number | null;
    latitude?: number | null;
    name: string;
    address: string;
    city: string;
    phoneNumber?: string | null;
    website?: string | null;
    description: string;
    espressoPrice?: string | null;
    hasPrivacy: boolean;
    hasParking: boolean;
    hasExterior: boolean;
    createdAt: Date;
    updatedAt: Date;
    openingHours?: OpeningHour[];
    imagesSelected?: imageSelected[];
    userImages?: UserImage[];
    comments?: Comment[];
    reviews?: Review[];
}

interface OpeningHour {
    id: string;
    coworkingId: string;
    weekdayText: string[];
    createdAt: Date;
    updatedAt: Date;
}

interface imageSelected {
    id: string;
    url: string;
    coworkingId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface UserImage {
    id: string;
    url: string;
    coworkingId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Comment {
    id: string;
    content: string;
    placeId: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

interface Review {
    id: string;
    content?: string | null;
    userId?: string | null;
    coworkingId: string;
    calmRating: number;
    equipRating: number;
    foodRating: number;
    feelingRating: number;
    createdAt: Date;
    updatedAt: Date;
}
