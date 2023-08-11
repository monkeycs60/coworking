import Image from 'next/image';
import { HowWho } from '@/types/howWho';

const HowWhoCard = ({
	lineColorUrl,
	customStyle,
	imageSize,
	responsiveBehavior,
	subtitle,
	content,
	image,
}: HowWho) => {
	return (
		<div className={`flex flex-col lg:items-center lg:justify-around ${customStyle}`}>
			<div className={`lg:${responsiveBehavior} flex flex-col gap-4 px-2 lg:w-[40%] `}>
				<div className='relative lg:space-x-4'>
					<div className=' absolute -left-4 top-0 h-full w-2 lg:w-[10px] '>
						<Image src={lineColorUrl} alt='flèche' fill className='' />
					</div>
					<h4 className='text-xl font-bold'>{subtitle}</h4>
				</div>
				<p>{content}</p>
			</div>
			<div className={`relative ${imageSize} px-4`}>
				<Image src={image} alt='flèche' fill />
			</div>
		</div>
	);
};

export default HowWhoCard;
