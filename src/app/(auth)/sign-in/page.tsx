import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const page = () => {
	return (
		<div className='absolute inset-0'>
			<div className='mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-20'>
				<Link href='/' className={cn(buttonVariants({variant: 'ghost'}))}>Hello</Link>
			</div>
		</div>
	);
};

export default page;
