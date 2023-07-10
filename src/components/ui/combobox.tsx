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

interface ComboBoxProps {
	onSelect: (place: Place) => void;
}

export function ComboBox({ onSelect }: ComboBoxProps) {
	const [open, setOpen] = React.useState(false);
	const [selectedPlace, setSelectedPlace] = React.useState<string | null>(
		null
	);

	const { inputField, predictions, setInput } = useFetchAutocomplete();
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
					{inputField
						? predictions.find((place) => place.value === inputField)
								?.label
						: 'Rechercher'}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandInput
						placeholder='Recherchez un lieu...'
						onValueChange={(value) => setInput(value)}
						value={inputField}
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
										inputField === place.value
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
