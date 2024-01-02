"use client"

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAppSelector } from '@/hooks/useRedux';
import { X } from 'lucide-react';
import { useAppDispatch } from '@/hooks/useRedux';
import { removeImageSelectedUrls } from '@/redux/features/placeDetails-slice';

interface SortablePhotoProps {
    imageUrl: string;
    id: number;
}


const SortablePhoto = (props: SortablePhotoProps) => {

    const imagesSelected = useAppSelector((state) => state.placeDetails.imageSelectedUrls);
    const dispatch = useAppDispatch();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={
            setNodeRef
        } style={style} {...attributes} {...listeners} className='bg-red-200'>
            <div className='relative'>
                <button
                    className='absolute right-0 top-0 z-50 h-4 w-4 hover:scale-125'
                    onClick={() => {
                        console.log('clicked', props.imageUrl);

                        dispatch(removeImageSelectedUrls(props.imageUrl));
                    }
                    }
                >
                    <X />
                </button>
                <img src={props.imageUrl} alt="image" width={200} height={200} />
            </div>
        </div >
    )
}

export default SortablePhoto