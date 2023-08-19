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
		weekday_text: string[];
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
