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
		<div className={`flex flex-col ${customStyle}`}>
			<div className={`lg:${responsiveBehavior} flex flex-col gap-4 px-2`}>
				<div className='relative'>
					<div className=' absolute -left-4 top-0 h-full w-2'>
						<Image src={lineColorUrl} alt='flèche' fill className='' />
					</div>
					<h4 className='text-xl font-bold'>{subtitle}</h4>
				</div>
				<p>{content}</p>
			</div>
			<div className={`relative ${imageSize} w-full px-4`}>
				<Image src={image} alt='flèche' fill />
			</div>
		</div>
	);
};

export default HowWhoCard;
