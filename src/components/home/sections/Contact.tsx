'use client';

import { ContactSchema, ContactSchemaType } from '@/types/contact';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useEmailSender } from '@/hooks/useEmailSender';

const Contact = () => {
	const { handleSubmitContact } = useEmailSender();

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactSchemaType>({
		resolver: zodResolver(ContactSchema),
	});

	const onSubmit = async (data: ContactSchemaType) => {
		const response = await handleSubmitContact(data);
		if (response) reset();
	};

	return (
		<section className='relative mt-[12vh] flex h-[750px] flex-col overflow-x-hidden rounded-xl lg:m-auto lg:w-[80%]'>
			<div
				className='relative h-[400px] rounded-xl px-4 py-2'
				style={{
					backgroundImage: "url('/contact.jpg')",
					backgroundSize: '100%',
					backgroundPosition: '50% 90%',
					backgroundRepeat: 'no-repeat',
				}}>
				<div className='mb-8 flex flex-col items-center justify-center gap-4 text-center lg:gap-8'>
					<h2 className='p-1 text-2xl font-bold text-black lg:text-3xl lg:text-white lg:drop-shadow-2xl'>
						Contactez-nous !
					</h2>
					<h3 className='rounded-lg bg-white/50 p-2 text-base text-gray-700 lg:w-[75%] lg:rounded-xl lg:bg-white/80 lg:text-base lg:text-gray-900 3xl:text-lg'>
						Vous souhaitez nous faire part d&apos;une remarque ? Vous avez
						des suggestions d&apos;amélioration ? N&apos;hésitez pas à
						nous contacter !
					</h3>
				</div>
				<form
					className='absolute left-1/2 z-20 m-auto flex w-[85%] -translate-x-1/2 flex-col justify-center gap-4 rounded-xl border-black bg-white p-6  shadow-xl lg:w-[55%] lg:p-10 '
					onSubmit={handleSubmit(onSubmit)}>
					<div className='flex flex-col gap-2'>
						<label htmlFor='email'>Email</label>
						<input
							{...register('email')}
							type='email'
							name='email'
							id='email'
							className='dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary dark:focus:ring-primary'
							placeholder='nom@gmail.com'
							required
						/>
						{errors.email && (
							<p className='text-xs italic text-red-600'>
								Veuillez entrer un email valide.
							</p>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='subject'>Sujet</label>
						<input
							{...register('subject')}
							type='text'
							name='subject'
							id='subject'
							className='focus:border-primary-500 dark:shadow-sm-light block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-900 shadow-sm focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary dark:focus:ring-primary'
							placeholder='Sujet de votre message'
							required
						/>
						{errors.subject && (
							<p className='text-xs italic text-red-600'>
								Veuillez entrer un sujet à votre message.
							</p>
						)}
					</div>
					<div className='flex flex-col gap-2'>
						<label htmlFor='message'>Message</label>
						<textarea
							{...register('message')}
							name='message'
							id='message'
							cols={20}
							rows={6}
							className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary dark:focus:ring-primary'
							placeholder='Laissez votre commentaire ici...'></textarea>
						{errors.message && (
							<p className='text-xs italic text-red-600'>
								Veuillez entrer un message de plus de 10 caractères.
							</p>
						)}
					</div>
					<Button
						type='submit'
						variant={'default'}
						size={'sm'}
						className='w-full lg:w-auto 3xl:px-6 3xl:py-3'>
						<span>Envoyez votre message</span>
					</Button>
				</form>
				<ToastContainer />
			</div>
		</section>
	);
};

export default Contact;
