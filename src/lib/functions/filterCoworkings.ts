import { Coworking } from '@/types/coworking';
import { FilterState } from '@/redux/features/filter-slice';
import {
    calmAverage,
    equipAverage,
    feelingAverage,
    foodAverage,
} from './averageRatingFromReviews';

export function filterCoworkings(
    coworkings: Coworking[],
    filteredState: FilterState,
) {
    const areAllFiltersUnchecked = () => {
        return Object.values(filteredState).every((value) => !value);
    };

    const filteredCoworkings = coworkings.filter((coworking) => {
        if (areAllFiltersUnchecked()) return true;

        let isValid = true;

        if (filteredState.Café) {
            isValid = isValid && coworking.facility === 'IS_CAFE';
        }
        if (filteredState.Hôtel) {
            isValid = isValid && coworking.facility === 'IS_HOTEL';
        }
        if (filteredState.Bibliothèque) {
            isValid = isValid && coworking.facility === 'IS_LIBRARY';
        }
        if (filteredState.Tiers_lieu) {
            isValid = isValid && coworking.facility === 'IS_THIRD_SPACE';
        }
        if (filteredState.Autre) {
            isValid = isValid && coworking.facility === 'IS_OTHER_TYPE';
        }
        if (filteredState.Calme) {
            isValid =
                isValid && coworking.reviews
                    ? calmAverage(coworking.reviews) >= 3.75
                    : false;
        }
        if (filteredState.Equipement) {
            isValid =
                isValid && coworking.reviews
                    ? equipAverage(coworking.reviews) >= 3.75
                    : false;
        }
        if (filteredState.Feeling) {
            isValid =
                isValid && coworking.reviews
                    ? feelingAverage(coworking.reviews) >= 3.75
                    : false;
        }
        if (filteredState.Food) {
            isValid =
                isValid && coworking.reviews
                    ? foodAverage(coworking.reviews) >= 3.75
                    : false;
        }

        if (filteredState.Accès_handicapé) {
            isValid = isValid && coworking.hasHandicap;
        }
        if (filteredState.Parking) {
            isValid = isValid && coworking.hasParking;
        }
        if (filteredState.Wifi) {
            isValid = isValid && coworking.hasWiFi;
        }
        if (filteredState.Call_friendly) {
            isValid = isValid && coworking.hasPrivacy;
        }
        if (filteredState.Extérieur) {
            isValid = isValid && coworking.hasExterior;
        }
        if (filteredState.Prises_électriques) {
            isValid = isValid && coworking.hasPlugs;
        }
        if (filteredState.Restauration) {
            isValid =
                (isValid && coworking.lunchPossibility) ||
                (isValid && coworking.snacksPossibility);
        }
        // Ajoutez d'autres conditions ici pour d'autres types de lieux
        return isValid;
    });
    return filteredCoworkings;
}
