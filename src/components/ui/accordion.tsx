'use client';

import React, {
	useState,
	ReactNode,
	FunctionComponent,
	ReactElement,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface AccordionProps {
	children: ReactNode;
}

interface AccordionItemProps {
	children: ReactNode;
	isActive?: boolean;
	onClick?: () => void;
}

interface AccordionTriggerProps {
	children: ReactNode;
	isActive?: boolean;
}

interface AccordionContentProps {
	children: ReactNode;
	isActive?: boolean;
}

const getAccordionHeight = () => {
	const width = window.innerWidth;
	if (width >= 1024) {
		return '100px';
	}
	return 'auto';
};

const Accordion: FunctionComponent<AccordionProps> = ({ children }) => {
	const [activeIndex, setActiveIndex] = useState(-1);

	const toggleItemActive = (index: number) => {
		setActiveIndex(index === activeIndex ? -1 : index);
	};

	return (
		<>
			{React.Children.map(children, (child, index) =>
				React.cloneElement(child as ReactElement<AccordionItemProps>, {
					isActive: index === activeIndex,
					onClick: () => toggleItemActive(index),
				})
			)}
		</>
	);
};

const AccordionItem: FunctionComponent<AccordionItemProps> = ({
	children,
	isActive,
	onClick,
}) => {
	return (
		<div onClick={onClick}>
			{React.Children.map(children, (child) =>
				React.cloneElement(child as ReactElement<any>, { isActive })
			)}
		</div>
	);
};

const AccordionTrigger: FunctionComponent<AccordionTriggerProps> = ({
	children,
	isActive,
}) => {
	return (
		<div className='flex cursor-pointer items-center justify-between gap-8 font-inter'>
			<p className='text-lg font-semibold'>{children}</p>
			{isActive ? (
				<Image src='/minus.svg' alt='minus' width={24} height={24} />
			) : (
				<Image src='/plus.svg' alt='plus' width={24} height={24} />
			)}
		</div>
	);
};

const AccordionContent: FunctionComponent<AccordionContentProps> = ({
	children,
	isActive,
}) => {
	const height = getAccordionHeight();
	const variants = {
		open: { opacity: 1, height: height },
		collapsed: { opacity: 0, height: 0 },
	};
	return isActive ? (
		<motion.div
			variants={variants}
			initial='collapsed'
			animate={isActive ? 'open' : 'collapsed'}
			transition={{ duration: 0.4 }}
			className='overflow-hidden px-2 py-4'>
			<p className='text-base text-gray-600'>{children}</p>
		</motion.div>
	) : null;
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
