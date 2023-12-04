import React from 'react';
import CheckboxGroup from '../inputs/CheckboxGroup';
import RadioGroup from '../inputs/RadioGroup';
import InputField from '../inputs/InputField';
import {
    FACILITY_TYPE,
    ACCESS_SPACES,
    BAR_RESTAURANT_OFFER,
    IDEAL_TIME,
    MUSIC,
    ON_SITE_AMENITIES,
    SUITED_FOR_COWORKING,
    WORK_ZONE,
    WIFI_QUALITY,
} from '@/lib/const/amenitiesCategories';
import { FieldErrors } from 'react-hook-form';
import { AddPlaceSchemaType } from '@/types/addPlace';

const ThingsToCheck = ({
    errors,
}: {
    errors: FieldErrors<AddPlaceSchemaType>;
}) => {
    return (
        <div className='flex flex-col gap-6'>
            <InputField
                defaultValue=''
                label="Prix d'un expresso (en €)"
                subLabel='rentre un chiffre... ex: 2.50'
                name='espressoPrice'
                error={errors.espressoPrice}
            />
            <RadioGroup
                title="Type d'établissement"
                name='facility'
                items={FACILITY_TYPE}
                error={errors.facility}
            />
            <CheckboxGroup title='Accès et espace' items={ACCESS_SPACES} />
            <CheckboxGroup
                title='Commodités sur place'
                items={ON_SITE_AMENITIES}
            />
            <RadioGroup
                title='Qualité du Wi-Fi'
                name='wifiQuality'
                items={WIFI_QUALITY}
            />
            <CheckboxGroup title='Zone(s) de travail' items={WORK_ZONE} />
            <CheckboxGroup
                title='Adapté pour coworker en'
                items={SUITED_FOR_COWORKING}
            />
            <CheckboxGroup title='Moment idéal' items={IDEAL_TIME} />
            <CheckboxGroup
                title='Offre bar/restauration'
                items={BAR_RESTAURANT_OFFER}
            />
            <RadioGroup title='Musique' name='music' items={MUSIC} />
        </div>
    );
};

export default ThingsToCheck;
