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

    // if indexof image selected is 0, create a special border around it
    if (props.imageUrl === imagesSelected[0].url) {
        return (
            <div className='relative'>
                <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='border-4 border-red-500 bg-red-200'>
                    <img src={props.imageUrl} alt="image" width={200} height={200} />
                </div >
                <button
                    className='absolute right-0 top-0 z-[5000] h-4 w-4 cursor-pointer hover:scale-125'
                    onClick={(e:
                        React.MouseEvent<HTMLButtonElement, MouseEvent>
                    ) => {
                        e.stopPropagation(); // This stops the click event from propagating to drag-and-drop listeners
                        console.log('clicked', props.imageUrl);

                        dispatch(removeImageSelectedUrls(props.id));
                    }
                    }
                >

                    <X />
                </button>
            </div>
        )
    } else return (
        <div className='relative'>
            <div ref={
                setNodeRef
            } style={style} {...attributes} {...listeners} className='bg-red-200'>
                <img src={props.imageUrl} alt="image" width={200} height={200} />
            </div >
            <button
                className='absolute right-0 top-0 z-[5000] h-4 w-4 cursor-pointer hover:scale-125'
                onClick={(e:
                    React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                    e.stopPropagation(); // This stops the click event from propagating to drag-and-drop listeners
                    console.log('clicked', props.imageUrl);

                    dispatch(removeImageSelectedUrls(props.id));
                }
                }
            >

                <X />
            </button>
        </div>
    )
}

export default SortablePhoto