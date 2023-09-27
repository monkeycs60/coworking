type CUID = string; // Assuming you use CUID as strings
type DateTime = Date;

export interface User {
    id: CUID;
    birthday?: string;
    email?: string;
    externalId?: string;
    firstName?: string;
    lastName?: string;
    name?: string;
    createdAt?: DateTime;
    lastSignInAt?: DateTime;
    profileImageUrl?: string;
    username?: string;
    image?: string;
    comments: Comment[];
    posts: Post[];
    reviews: Review[];
    places: Coworking[];
}

export interface VerificationToken {
    identifier: string;
    token: string;
    expires: DateTime;
}

export interface Coworking {
    id: CUID;
    userId: CUID | null;
    user?: User;
    placeId?: string | null;
    longitude?: number | null;
    latitude?: number | null;
    name: string;
    address: string;
    city: string;
    phoneNumber?: string | null;
    website?: string | null;
    description: string;
    openingHours?: OpeningHour[];
    imagesSelected: imageSelected[];
    userImages: UserImage[];
    comments?: Comment[];
    espressoPrice?: string | null;
    hasPrivacy: boolean;
    hasParking: boolean;
    hasWiFi: boolean;
    hasExterior: boolean;
    hasPlugs: boolean;
    hasHandicap: boolean;
    smallTables: boolean;
    largeWorktables: boolean;
    counterSeats: boolean;
    standingTables: boolean;
    outdoorSeating: boolean;
    soloCoworker: boolean;
    smallGroup: boolean;
    bigGroup: boolean;
    morningDuration: boolean;
    afternoonDuration: boolean;
    fullDuration: boolean;
    snacksPossibility: boolean;
    lunchPossibility: boolean;
    souperPossibility: boolean;
    drinksPossibility: boolean;
    alcoolPossibility: boolean;
    noMusic: boolean;
    discreteMusic: boolean;
    randomMusic: boolean;
    loudMusic: boolean;
    highWifi: boolean;
    mediumWifi: boolean;
    lowWifi: boolean;
    reviews?: Review[];
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface OpeningHour {
    id: CUID;
    coworkingId: string;
    coworking: Coworking;
    weekdayText: string[];
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Comment {
    id: CUID;
    content: string;
    placeId: string;
    userId: CUID;
    user: User;
    place: Coworking;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface Post {
    id: CUID;
    title: string;
    content: string;
    published: boolean;
    authorId: CUID;
    author: User;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface imageSelected {
    id: CUID;
    url: string;
    userId?: CUID;
    user?: User;
    coworkingId: string;
    coworking?: Coworking;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export interface UserImage {
    id: CUID;
    url: string;
    coworkingId: CUID;
    coworking?: Coworking;
    userId: CUID | null;
    user?: User;
    createdAt: DateTime;
    updatedAt: DateTime;
}

export type UnifiedImage = {
    id: CUID;
    url: string;
    coworkingId: string;
    createdAt: DateTime;
    updatedAt: DateTime;
    userId?: CUID | null;
    user?: User;
    coworking?: Coworking;
};

export interface Review {
    id: CUID;
    content?: string | null;
    userId?: CUID | null;
    placeId: string | null;
    user?: User;
    coworkingId?: CUID;
    coworking?: Coworking;
    calmRating: number;
    equipRating: number;
    foodRating: number;
    feelingRating: number;
    createdAt: DateTime;
    updatedAt: DateTime;
}
