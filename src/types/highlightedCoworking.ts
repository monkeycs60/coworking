import { Review } from "./coworking";

interface Image {
    url: string;
}

interface Coworking {
    id: string;
    name: string;
    address: string;
    city: string;
    reviews: Review[];
    userImages: Image[];
    imagesSelected: Image[];
}

export interface CoworkingCardProps {
    id: string;
    name: string;
    address: string;
    city: string;
    reviews: Review[];
    userImages: Image[];
    imagesSelected: Image[];
}

export interface CoworkingListProps {
    coworkings: Coworking[];
}
