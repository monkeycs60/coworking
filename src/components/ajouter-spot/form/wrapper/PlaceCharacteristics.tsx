import InputField from '../inputs/InputField';
import OpeningHours from '../inputs/OpeningHours';
import TextAreaField from '../inputs/TextAreaField';
import { PlaceDetail } from '@/types/placeDetails';
import { extractCityFromAdrAddress } from '@/lib/functions/extractCityFromAddress';
import {
    Controller,
    FieldErrors,
    FormProvider,
    useForm,
    useFormContext,
} from 'react-hook-form';
import { usePlaceDetailsStore } from '@/zustand/stores/placeDetailsStore';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';
import {
    CharacteristicsSchema,
    ExtendedCharacteristicsType,
} from '@/types/place/characteristics';
import { zodResolver } from '@hookform/resolvers/zod';
import { DevTool } from '@hookform/devtools';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

const PlaceCharacteristics = () => {
    const placeDetails = usePlaceDetailsStore((state) => state.details);

    const {
        vicinity,
        name,
        adr_address,
        formatted_phone_number,
        website,
        editorial_summary,
    } = placeDetails as PlaceDetail;

    const form = useForm<ExtendedCharacteristicsType>({
        mode: 'all',
        resolver: zodResolver(CharacteristicsSchema),
    });
    const {
        characteristics,
        stepNumber,
        updateStep,
        incrementStep,
        decrementStep,
    } = useAddCoworkingStore();

    console.log({ stepNumber });

    const equipmentOptions: { id: string; label: string }[] = [
        { id: 'ACCESSIBLE', label: 'Accès handicapé' },
        { id: 'PARKING', label: 'Parking' },
        { id: 'TERRACE', label: 'Terrasse' },
        { id: 'OUTLETS', label: 'Prises' },
        { id: 'BOOTH', label: 'Isoloir' },
    ] as const;

    const handleEspressoPriceChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const value = event.target.value;

        if (!value) {
            form.setValue('espressoPrice', '');
            return;
        }

        // Remplacer la virgule par un point et appliquer l'expression régulière
        const match = value.replace(',', '.').match(/^\d*(\.\d{0,2})?/);

        // Vérifier que match n'est pas null avant d'accéder à ses éléments
        if (match && match[0]) {
            form.setValue('espressoPrice', match[0]);
        }
    };

    return (
        <>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit((data) => {
                        const completeData: ExtendedCharacteristicsType = {
                            ...data,
                            longitude: placeDetails?.geometry.location.lng || 0,
                            latitude: placeDetails?.geometry.location.lat || 0,
                            placeId: placeDetails?.place_id || '',
                        };

                        try {
                            fetch('/api/placeCharacteristics', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(completeData),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log('Success:', data);

                                    updateStep(
                                        1,
                                        completeData as ExtendedCharacteristicsType,
                                    );

                                    incrementStep();
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        } catch (error) {
                            console.error('Error:', error);
                        }
                    })}
                >
                    <FormField
                        name='name'
                        control={form.control}
                        defaultValue={name ? name : ''}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom de l'établissement</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='Novotel Bordeaux Centre'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Renseignez le nom de l'établissement
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        name='address'
                        control={form.control}
                        defaultValue={vicinity ? vicinity : ''}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Adresse de l'établissement
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='30 rue du Général Leclerc'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Renseignez l'adresse de l'établissement
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        name='city'
                        control={form.control}
                        defaultValue={
                            adr_address
                                ? extractCityFromAdrAddress(adr_address) || ''
                                : ''
                        }
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Ville</FormLabel>
                                <FormControl>
                                    <Input placeholder='Bordeaux' {...field} />
                                </FormControl>
                                <FormDescription>
                                    Dans quelle ville se situe l'établissement
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        name='phoneNumber'
                        control={form.control}
                        defaultValue={
                            formatted_phone_number ? formatted_phone_number : ''
                        }
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Numéro de téléphone</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='05 56 00 00 00'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Renseignez le numéro de téléphone
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        name='website'
                        control={form.control}
                        defaultValue={website ? website : ''}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Site web</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder='www.novotel.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Renseignez le site web
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>
                    <FormField
                        name='description'
                        control={form.control}
                        defaultValue={editorial_summary?.overview ?? ''}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Décris le cadre et comment le coworking s'y insère"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Décris le lieu, le cadre et comment le
                                    coworking s'y insère
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='outline'>
                                Renseigner les horaires
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='max-w-[500px] max-h-[80vh] overflow-y-auto'>
                            <DialogHeader>
                                <DialogTitle>
                                    Renseigner les horaires
                                </DialogTitle>
                                <DialogDescription>
                                    Renseignez les horaires d'ouverture de
                                    l'établissement
                                </DialogDescription>
                            </DialogHeader>
                            <OpeningHours />
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type='button'>Valider</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <FormField
                        name='establishmentType'
                        control={form.control}
                        defaultValue={characteristics.establishmentType || ''}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Type d'établissement</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder="
                                            Sélectionnez un type d'établissement
                                            "
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value='HOTEL_LOBBY'>
                                            Hall d'hôtel
                                        </SelectItem>
                                        <SelectItem value='CAFE'>
                                            Café
                                        </SelectItem>
                                        <SelectItem value='RESTAURANT_BAR'>
                                            Restaurant / Bar
                                        </SelectItem>
                                        <SelectItem value='THIRD_PLACE'>
                                            Tiers-lieu
                                        </SelectItem>
                                        <SelectItem value='LIBRARY'>
                                            Bibliothèque
                                        </SelectItem>
                                        <SelectItem value='OTHER'>
                                            Autre
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormDescription>
                                    Renseignez le type d'établissement
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>

                    <FormField
                        name='espressoPrice'
                        control={form.control}
                        defaultValue={characteristics.espressoPrice || ''}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Prix de l'espresso</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Prix de l'espresso"
                                        {...field}
                                        onChange={handleEspressoPriceChange}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Renseignez le prix de l'espresso
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    ></FormField>

                    {equipmentOptions.map((option) => (
                        <FormField
                            key={option.id}
                            name='facilities'
                            control={form.control}
                            defaultValue={characteristics.facilities || []}
                            render={({ field }) => (
                                <FormItem key={option.id}>
                                    <FormLabel>{option.label}</FormLabel>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value?.includes(
                                                option.id as
                                                    | 'ACCESSIBLE'
                                                    | 'PARKING'
                                                    | 'TERRACE'
                                                    | 'OUTLETS'
                                                    | 'BOOTH',
                                            )}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? field.onChange([
                                                          ...(field.value ||
                                                              []),
                                                          option.id,
                                                      ])
                                                    : field.onChange(
                                                          field.value?.filter(
                                                              (value) =>
                                                                  value !==
                                                                  option.id,
                                                          ),
                                                      );
                                            }}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {option.label}
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        ></FormField>
                    ))}

                    <button>Valider le form</button>
                </form>
            </Form>
            <DevTool control={form.control} />
        </>
    );
};

export default PlaceCharacteristics;
