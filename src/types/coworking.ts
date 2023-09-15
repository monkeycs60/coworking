export type User = {
    id: string;
    birthday: Date | null;
    email: string;
    externalId: string | null;
    firstName: string | null;
    lastName: string | null;
    name: string;
    createdAt: Date;
    lastSignInAt: Date | null;
    profileImageUrl: string | null;
    username: string;
    image: string;
};

export type Review = {
    id: string;
    content: string;
    userId: string;
    placeId: string | null;
    coworkingId: string;
    calmRating: number;
    equipRating: number;
    foodRating: number;
    feelingRating: number;
    createdAt: Date;
    updatedAt: Date;
    user: User;
};

export type ImageSelected = {
    id: string;
    url: string;
    coworkingId: string;
    coworking?: Coworking;
    createdAt: Date;
    updatedAt: Date;
};

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

export type OpeningHour = {
    id: string;
    coworkingId: string;
    weekdayText: string[];
    createdAt: Date;
    updatedAt: Date;
};

export type Coworking = {
    id: string;
    userId: string | null;
    placeId: string;
    longitude: number;
    latitude: number;
    name: string;
    address: string;
    city: string;
    phoneNumber: string;
    website: string;
    description: string;
    espressoPrice: string;
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
    createdAt: Date;
    updatedAt: Date;
    openingHours: OpeningHour[];
    imagesSelected: ImageSelected[];
    userImages: any[]; // Depending on the structure of userImages, you might want to replace any with an appropriate export type
    comments: any[]; // Depending on the structure of comments, you might want to replace any with an appropriate export type
    reviews: Review[];
};
