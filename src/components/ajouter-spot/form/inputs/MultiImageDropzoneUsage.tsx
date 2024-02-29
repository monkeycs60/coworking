'use client';

import {
    MultiImageDropzone,
    type FileState,
} from '@/components/ui/MultiImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useRedux';
import { addImageSelectedUrls } from '@/redux/features/placeDetails-slice';
import { useAddCoworkingStore } from '@/zustand/stores/coworkingStore';

export function MultiImageDropzoneUsage() {
    const { uploadedImages, updateStep, addImage } = useAddCoworkingStore();
    const imagesSelected = uploadedImages.imageSelectedUrls;

    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(
                (fileState) => fileState.key === key,
            );
            if (fileState) {
                fileState.progress = progress;
            }
            return newFileStates;
        });
    }

    return (
        <div className='w-1/2'>
            <MultiImageDropzone
                value={fileStates}
                dropzoneOptions={{
                    maxFiles: 6,
                }}
                onChange={(files) => {
                    setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                    setFileStates([...fileStates, ...addedFiles]);
                    const newImages = await Promise.all(
                        addedFiles.map(async (addedFileState) => {
                            try {
                                const res = await edgestore.publicImages.upload(
                                    {
                                        file: addedFileState.file,
                                        onProgressChange: async (progress) => {
                                            updateFileProgress(
                                                addedFileState.key,
                                                progress,
                                            );
                                            if (progress === 100) {
                                                // wait 1 second to set it to complete
                                                // so that the user can see the progress bar at 100%
                                                await new Promise((resolve) =>
                                                    setTimeout(resolve, 1000),
                                                );
                                                updateFileProgress(
                                                    addedFileState.key,
                                                    'COMPLETE',
                                                );
                                            }
                                        },
                                    },
                                );
                                console.log(res);

                                const ImageDate = {
                                    id: Math.floor(
                                        Date.now() + Math.random() * 1000,
                                    ),
                                    url: res.url,
                                };

                                addImage(ImageDate);
                            } catch (err) {
                                updateFileProgress(addedFileState.key, 'ERROR');
                            }
                        }),
                    );
                }}
            />
        </div>
    );
}
