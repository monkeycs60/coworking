import InputField from '../inputs/InputField';
import OpeningHours from '../inputs/OpeningHours';
import TextAreaField from '../inputs/TextAreaField';
import { PlaceDetail } from '@/types/placeDetails';
import { extractCityFromAdrAddress } from '@/lib/functions/extractCityFromAddress';
import { FieldErrors } from 'react-hook-form';
import { AddPlaceSchemaType } from '@/types/addPlace';

const PrecompletedForm = ({
    placeDetails,
    errors,
}: {
    placeDetails: PlaceDetail;
    errors: FieldErrors<AddPlaceSchemaType>;
}) => {
    const {
        vicinity,
        name,
        adr_address,
        formatted_phone_number,
        website,
        editorial_summary,
    } = placeDetails || {};
    console.log('erreurs', errors);
    return (
        <>
            <InputField
                defaultValue={name ? name : ''}
                label="Nom de l'établissement"
                name='name'
                error={errors.name}
                isMandatory={true}
            />
            <InputField
                defaultValue={vicinity ? vicinity : ''}
                label='Adresse'
                name='address'
                error={errors.address}
                isMandatory={true}
            />
            <InputField
                defaultValue={
                    adr_address
                        ? extractCityFromAdrAddress(adr_address) || ''
                        : ''
                }
                label='Ville'
                name='city'
                error={errors.city}
                isMandatory={true}
            />
            <InputField
                defaultValue={
                    formatted_phone_number ? formatted_phone_number : ''
                }
                label='Numéro de téléphone'
                name='phoneNumber'
                error={errors.phoneNumber}
                isMandatory={false}
            />
            <InputField
                defaultValue={website ? website : ''}
                label='Site web'
                name='website'
                error={errors.website}
                isMandatory={false}
            />
            <TextAreaField
                defaultValue={
                    editorial_summary?.overview
                        ? editorial_summary.overview
                        : ''
                }
                label='Description'
                subLabel="Décris le lieu, le cadre et comment le coworking s'y insère"
                name='description'
                error={errors.description}
                isMandatory={true}
            />

            <OpeningHours
                placeDetails={placeDetails}
                errors={
                    errors.openingHours ? errors.openingHours : { message: '' }
                }
            />
        </>
    );
};

export default PrecompletedForm;
