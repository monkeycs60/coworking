import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';

const Faq = () => {
	return (
		<section className='my-[5vh] flex flex-col gap-8 overflow-x-hidden px-4 lg:h-[100vh]'>
			<div className='mb-8 flex flex-col items-center justify-center gap-4 text-center'>
				<h2 className='text-2xl font-bold'>Foire aux questions</h2>
				<h3 className='text-base text-gray-700 lg:w-[75%] lg:text-base 3xl:text-lg'>
					Vous vous demandez comment ça marche ? Vous avez une question sur
					notre fonctionnement ? Vous êtes au bon endroit !
				</h3>
			</div>
			<Accordion>
				<AccordionItem>
					<AccordionTrigger>Qu’est-ce que le coworking ?</AccordionTrigger>
					<AccordionContent>
						Le coworking, c&apos;est un peu comme une grande colocation
						pour travailleurs indépendants, entrepreneurs, start-ups et
						même des employés de grandes entreprises. Plutôt que de
						travailler chacun dans son coin, à la maison ou dans un bureau
						isolé, l&apos;idée du coworking, c&apos;est de partager un
						grand espace de travail où tout le monde peut échanger,
						collaborer, et pourquoi pas, partager un café ou un repas à
						l&apos;occasion.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem>
					<AccordionTrigger>
						Quels types d’établissements sont référencés ?
					</AccordionTrigger>
					<AccordionContent>
						Nous référençons tous les types d&apos;établissements qui
						proposent des espaces de travail partagés gratuitement : les
						cafés, les restaurants, les hôtels, les bibliothèques, les
						espaces de coworking associatifs, les espaces de coworking
						d&apos;entreprises, les espaces de coworking dans les
						tiers-lieux, les espaces de coworking dans les centres
						commerciaux etc.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem>
					<AccordionTrigger>
						Quelles villes sont disponibles ?
					</AccordionTrigger>
					<AccordionContent>
						Pour le moment, nous référençons uniquement les villes de
						Paris, Lyon, Marseille, Bordeaux et Toulouse. Nous comptons
						nous développer dans d&apos;autres villes et pays dans les
						mois à venir.
					</AccordionContent>
				</AccordionItem>
				<AccordionItem>
					<AccordionTrigger>
						Comment ajouter un nouvel endroit ?
					</AccordionTrigger>
					<AccordionContent>
						Pour ajouter un nouvel endroit, il vous suffit de vous créer
						un compte, puis de vous rendre sur la page{' '}
						<a href='/add-coworking' className='font-semibold underline'>
							Ajouter un spot
						</a>
						. Vous n&apos;avez plus qu&apos;à remplir le formulaire, et
						nous nous chargerons de vérifier les informations et de
						publier votre spot.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</section>
	);
};

export default Faq;
