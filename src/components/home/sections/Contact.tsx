'use client';

import { ContactSchema, ContactSchemaType } from '@/types/contact';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const Contact = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ContactSchemaType>({
		resolver: zodResolver(ContactSchema),
	});

	const onSubmit = async (data: ContactSchemaType) => {
		const response = await fetch('/api/contact', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		});

		console.log('response', response);

		if (response.ok) {
			console.log('Email envoyé avec succès');
			reset();
			toast.success('Votre message a bien été envoyé !', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			console.log("Erreur lors de l'envoi de l'email");
			toast.error(
				"Une erreur est survenue lors de l'envoi de votre message. Veuillez réessayer plus tard.",
				{
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				}
			);
		}
	};

	return (
		<section className='my-[8vh] flex flex-col overflow-x-hidden lg:h-[100vh]'>
			<div
				className='relative h-[400px] px-4 py-2'
				style={{
					backgroundImage: "url('/contact.jpg')",
					backgroundSize: '100%',
					backgroundPosition: '50% 90%',
					backgroundRepeat: 'no-repeat',
				}}>
				<div className='mb-8 flex flex-col items-center justify-center gap-4 text-center'>
					<h2 className='p-1 text-2xl font-bold text-black'>
						Contactez-nous !
					</h2>
					<h3 className='rounded-lg bg-white/50 p-2 text-base text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
						Vous souhaitez nous faire part d&apos;une remarque ? Vous avez
						des suggestions d&apos;amélioration ? N&apos;hésitez pas à
						nous contacter !
					</h3>
				</div>
			</div>
			<form
				action=''
				className='z-20 m-auto flex w-[85%] translate-y-[-200px] flex-col justify-center gap-4 rounded-xl  bg-white p-6'
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
		</section>
	);
};

export default Contact;
