import { currentUser } from '@clerk/nextjs';

export default async function UtilisateurConnected() {
	const user = await currentUser();


	return (
		<div>
			<h1>Utilisateur connecté</h1>
			{user ? (
				<div>
					<p>Utilisateur connecté</p>
					<p>{user?.id}</p>
					<p>
						{user?.firstName} - {user?.lastName}
					</p>
				</div>
			) : (
				<p>Utilisateur non connecté</p>
			)}
		</div>
	);
}
