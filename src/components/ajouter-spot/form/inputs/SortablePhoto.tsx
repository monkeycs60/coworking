'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useAppSelector } from '@/hooks/useRedux';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useRedux';
import { removeImageSelectedUrls } from '@/redux/features/placeDetails-slice';
import { useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import useUpdateImagesSelected from '@/hooks/useUpdateImagesSelected';

interface SortablePhotoProps {
    imageUrl: string;
    id: number;
}

const SortablePhoto = (props: SortablePhotoProps) => {
    const { setValue, trigger, watch } = useFormContext();

    console.log(watch('imageSelectedUrls'));
    
    
    useUpdateImagesSelected();
    
    const imagesSelected = useAppSelector(
        (state) => state.placeDetails.imageSelectedUrls,
        );
        console.log(imagesSelected);
    const dispatch = useAppDispatch();
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    useEffect(() => {
        setValue('imageSelectedUrls', imagesSelected);
        trigger('imageSelectedUrls');
    }, [imagesSelected, setValue, trigger]);

    if (props.imageUrl === imagesSelected[0].url) {
        return (
            <div className='relative'>
                <div
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className='border-4 border-red-500 bg-red-200'
                >
                    <img
                        src={props.imageUrl}
                        alt='image'
                        width={200}
                        height={200}
                    />
                </div>
                <button
                    className='absolute right-0 top-0 z-[5000] h-4 w-4 cursor-pointer hover:scale-125'
                    onClick={() => {
                        dispatch(removeImageSelectedUrls(props.imageUrl));
                        console.log(imagesSelected);
                        // const updatedImages = imagesSelected.filter(
                        //     (image) => image.id !== props.id,
                        // );
                        // setValue('imageSelectedUrls', updatedImages);

                        // // Optionally, trigger validation for 'imageSelectedUrls' field
                        // trigger('imageSelectedUrls');
                        // console.log(imagesSelected);
                        // forceUpdate(); // Cela forcera le composant à se re-rendre
                    }}
                >
                    <X />
                </button>
            </div>
        );
    } else
        return (
            <div className='relative'>
                <div
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    className='bg-red-200'
                >
                    <img
                        src={props.imageUrl}
                        alt='image'
                        width={200}
                        height={200}
                    />
                </div>
                <button
                    className='absolute right-0 top-0 z-[5000] h-4 w-4 cursor-pointer hover:scale-125'
                    onClick={() => {
                        dispatch(removeImageSelectedUrls(props.imageUrl));
                        console.log(imagesSelected);
                        // const updatedImages = imagesSelected.filter(
                        //     (image) => image.id !== props.id,
                        // );
                        // setValue('imageSelectedUrls', updatedImages);

                        // // Optionally, trigger validation for 'imageSelectedUrls' field
                        // trigger('imageSelectedUrls');
                        // console.log(imagesSelected);
                        // forceUpdate(); // Cela forcera le composant à se re-rendre
                    }}
                >
                    <X />
                </button>
            </div>
        );
};

export default SortablePhoto;
