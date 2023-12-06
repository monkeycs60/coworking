export interface OpeningDetail {
    day: number;
    time: string;
}

export interface Period {
    open: OpeningDetail;
    close: OpeningDetail;
}

export interface PlaceDetail {
    adr_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
    editorial_summary: {
        language: string;
        overview: string;
    };
    formatted_phone_number: string;
    name: string;
    current_opening_hours: {
        open_now: boolean;
        periods: Period[];
        weekday_text?: string[];
    };
    opening_hours: {
        open_now: boolean;
        periods: Period[];
        weekday_text?: string[];
    };
    photos: {
        height: number;
        html_attributions: string[];
        photo_reference: string;
        width: number;
    }[];
    place_id: string;
    vicinity: string;
    website: string;
}

export interface PlaceDetailResponse {
    data: {
        result: {
            adr_address: string;
            geometry: {
                location: {
                    lat: number;
                    lng: number;
                };
            };
            editorial_summary: {
                language: string;
                overview: string;
            };
            formatted_phone_number: string;
            name: string;
            current_opening_hours: {
                open_now: boolean;
                periods: Period[];
                weekday_text?: string[];
            };
            opening_hours: {
                open_now: boolean;
                periods: Period[];
                weekday_text?: string[];
            };
            photos: {
                height: number;
                html_attributions: string[];
                photo_reference: string;
                width: number;
            }[];
            place_id: string;
            vicinity: string;
            website: string;
        };
        status: string;
    };
    message: string;
}
