'use client';

import * as React from 'react';
import { useFetchAutocomplete } from '@/hooks/useFetchAutocomplete';
import { useFetchPlaceDetails } from '@/hooks/useFetchPlaceDetails';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from '@/components/ui/command';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { Place } from '@/types/placePredictions';
import { PlaceDetail } from '@/hooks/useFetchPlaceDetails';

interface ComboBoxProps {
	onSelect: (place: Place) => void;
}

export function ComboBox({ onSelect }: ComboBoxProps) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('');
	const [selectedPlace, setSelectedPlace] = React.useState<string | null>(
		null
	);

	const predictions = useFetchAutocomplete(value);
	const placeDetails = useFetchPlaceDetails(selectedPlace);

	const handleSelect = (place: Place) => {
		setOpen(false);
		setSelectedPlace(place.value);
		onSelect(place);
	};

	return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						role='combobox'
						aria-expanded={open}
						className='w-[200px] justify-between'>
						{value
							? predictions.find((place) => place.value === value)?.label
							: 'Select location...'}
						<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-[200px] p-0'>
					<Command>
						<CommandInput
							placeholder='Recherchez un lieu...'
							onValueChange={(value) => {
								setValue(value);
							}}
							value={value}
						/>
						<CommandEmpty>
							Aucun lieu ne correspond à votre recherche
						</CommandEmpty>
						<CommandGroup>
							{predictions.map((place) => (
								<CommandItem
									key={place.value}
									style={{ cursor: 'pointer' }}
									onSelect={() => {
										handleSelect(place);
									}}>
									<Check
										className={cn(
											'mr-2 h-4 w-4',
											value === place.value
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
									{place.label}
								</CommandItem>
							))}
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
	);
}
