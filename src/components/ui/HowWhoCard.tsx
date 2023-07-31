import Image from "next/image";
import { HowWho } from "@/types/howWho";

const HowWhoCard = ({
     lineColor,
    responsiveBehavior,
    subtitle,
    content,
    image
}: HowWho) => {
  return (
		<div className='bg-red-300'>
			<div className='flex flex-col gap-4 px-2'>
				<div className='relative'>
					<div className=' absolute -left-4 top-0 h-full w-2'>
						<Image
							src={'/howtoLINE.svg'}
							alt='flèche'
							fill
							className=''
						/>
					</div>
					<h4 className='text-xl font-bold'>
						Freelance, entrepreneur, salarié en télétravail ou étudiant ?
					</h4>
				</div>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et
					massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien
					fringilla, mattis ligula consectetur, ultrices mauris.{' '}
				</p>
			</div>
			<div className='relative h-[300px] w-full px-4 '>
				<Image src={'/howto1.svg'} alt='flèche' fill />
			</div>
		</div>
  );
}

export default HowWhoCard