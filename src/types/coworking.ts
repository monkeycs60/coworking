export interface Coworking {
    id: string;
    userId?: string | null;
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
    userImages?: UserImage[];
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
    reviews?: Review[];
    createdAt: Date;
    updatedAt: Date;
}

export interface User {
    id: string;
    name?: string | null;
    username?: string | null;
    bio?: string | null;
    age?: number | null;
    email?: string | null;
    emailVerified?: Date | null;
    password?: string | null;
    image?: string | null;
    accounts: Account[];
    sessions: Session[];
    comments: Comment[];
    posts: Post[];
    reviews: Review[];
    places: Coworking[];
    createdAt: Date;
}

export interface Account {
    id: string;
    userId: string;
    type: string;
    provider: string;
    providerAccountId: string;
    refresh_token?: string | null;
    access_token?: string | null;
    expires_at?: number | null;
    refresh_token_expires_in?: number | null;
    token_type?: string | null;
    scope?: string | null;
    id_token?: string | null;
    session_state?: string | null;
    user: User;
}

export interface Session {
    id: string;
    sessionToken: string;
    userId: string;
    expires: Date;
    user: User;
}

export interface OpeningHour {
    id: string;
    coworkingId: string;
    coworking?: Coworking;
    weekdayText: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface imageSelected {
    id: string;
    url: string;
    coworkingId: string;
    coworking?: Coworking;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserImage {
    id: string;
    url: string;
    coworkingId: string;
    coworking?: Coworking;
    userId: string;
    user?: User;
    createdAt: Date;
    updatedAt: Date;
}

export interface Comment {
    id: string;
    content: string;
    placeId: string;
    userId: string;
    user?: User;
    place?: Coworking;
    createdAt: Date;
    updatedAt: Date;
}

export interface Review {
    id: string;
    content?: string | null;
    userId?: string | null;
    user?: User;
    coworkingId: string;
    coworking?: Coworking;
    calmRating: number;
    equipRating: number;
    foodRating: number;
    feelingRating: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    published: boolean;
    authorId: string;
    author: User;
    createdAt: Date;
    updatedAt: Date;
}
