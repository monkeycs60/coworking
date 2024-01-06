"use client";

import * as React from 'react';
import { useFormContext, Controller, FieldErrors } from 'react-hook-form';
import { AddPlaceSchemaType } from '@/types/addPlace';

const OtherCharacteristics = ({ errors }: {
  errors: FieldErrors<AddPlaceSchemaType>;
}) => {
  const { control, getValues, setValue, register, watch } = useFormContext<AddPlaceSchemaType>();
  console.log('watch :', watch());

  type EquipmentEnum = 'ACCESSIBLE' | 'PARKING' | 'TERRACE' | 'OUTLETS' | 'BOOTH';
  const equipmentOptions: { value: EquipmentEnum; label: string; }[] = [
    { value: 'ACCESSIBLE', label: 'Accès handicapé' },
    { value: 'PARKING', label: 'Parking' },
    { value: 'TERRACE', label: 'Terrasse' },
    { value: 'OUTLETS', label: 'Prises' },
    { value: 'BOOTH', label: 'Isoloir' }, // Changed from 'VOTING_BOOTH' to 'BOOTH' to match the schema
  ];

  const handleEspressoPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (!value) {
      setValue('espressoPrice', '');
      return;
    }

    // Remplacer la virgule par un point et appliquer l'expression régulière
    const match = value.replace(',', '.').match(/^\d*(\.\d{0,2})?/);

    // Vérifier que match n'est pas null avant d'accéder à ses éléments
    if (match && match[0]) {
      setValue('espressoPrice', match[0]);
    }
  };

  const handleEquipmentClick = (equipment
    : EquipmentEnum
  ) => {
    const currentFacilities = getValues('facilities') || [];
    setValue('facilities', currentFacilities.includes(equipment)
      ? currentFacilities.filter((e: string) => e !== equipment)
      : [...currentFacilities, equipment]
    );
  };

  return (
    <div className="space-y-4">
      <div className='mb-24 flex justify-between'>
        <Controller
          name="establishmentType"
          control={control}
          render={({ field }) => (
            <select {...field} className="w-[180px]">
              <option value="">Type d'établissement</option>
              <option value="HOTEL_LOBBY">Lobby d'hôtel</option>
              <option value="CAFE">Café</option>
              <option value="RESTAURANT_BAR">Restaurant-Bar</option>
              <option value="THIRD_PLACE">Tiers-lieu</option>
              <option value="LIBRARY">Bibliothèque</option>
              <option value="OTHER">Autre</option>
            </select>
          )}
        />
        {errors.establishmentType && <span className="text-red-500">Ce champ est requis</span>}

        <input
          type="text"
          {...register('espressoPrice')}
          placeholder="Prix de l'espresso"
          className="w-[180px]"
          onChange={handleEspressoPriceChange}
          value={getValues('espressoPrice') || ''}
        />
        {errors.espressoPrice && <span className="text-red-500">Ce champ est requis</span>}

      </div>

      <div className="flex flex-wrap gap-2">
        {equipmentOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => handleEquipmentClick(option.value)}
            className={`rounded-md border-2 p-2 ${getValues('facilities')?.includes(option.value) ? 'bg-blue-500 text-white' : 'bg-white text-black'
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      {errors.facilities && <span className="text-red-500">This field is required</span>}
    </div>
  );
};

export default OtherCharacteristics;
