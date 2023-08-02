import { toast } from 'react-toastify';
import { sendContactMail } from '@/services/sendContactMail';
import { ContactSchemaType } from '@/types/contact';

export const useEmailSender = () => {
	const handleSubmitContact = async (data: ContactSchemaType) => {
		const response = await sendContactMail(data);

		if (response.ok) {
			toast.success('Votre message a bien été envoyé !', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
			return true;
		} else {
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
			return false;
		}
	};

	return { handleSubmitContact };
};