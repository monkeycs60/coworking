import CustomWidthTooltip from '@/components/ui/CustomWidthTooltip';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';

interface CoworkingFeatureProps {
    icon: string;
    alt: string;
    title: string;
    value: number;
    imgWidth?: number;
    imgHeight?: number;
}

const CoworkingFeature = ({
    icon,
    alt,
    title,
    value,
    imgWidth,
    imgHeight,
}: CoworkingFeatureProps) => (
    <div className='flex flex-col justify-center'>
        <div className='flex items-center justify-around gap-3 px-4 pt-2'>
            <div className='flex h-[30px] w-[30px] items-center justify-center'>
                <Image
                    src={icon}
                    alt={alt}
                    width={imgWidth ?? 30}
                    height={imgHeight ?? 30}
                />
            </div>
            <CustomWidthTooltip
                title={title}
                placement='top'
                sx={{ '.MuiTooltip-tooltip': { padding: 1 } }}
            >
                <Progress value={value * 20} />
            </CustomWidthTooltip>
        </div>
        <span className='flex w-[60%] cursor-pointer pl-16 text-xs'>{alt}</span>
    </div>
);

export default CoworkingFeature;
