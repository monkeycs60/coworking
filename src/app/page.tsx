import GoogleMapElement from '@/components/maps/GoogleMapElement';

export default function Home() {
	return (
		<section className='overall-bg mt-20 flex flex-col h-[1500px] '>
			<h1 className='font-telma text-3xl'>Coworkez Malin</h1>
			<GoogleMapElement
				height='400px'
				width='500px'
				centerMap={{ lat: 46.603354, lng: 1.888334 }}
				zoom={5}
			/>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum
				ullam vero blanditiis, amet soluta itaque iure magni expedita quos
				excepturi laudantium, optio ea, molestias dignissimos voluptatum.
				Possimus enim nihil neque consectetur libero distinctio mollitia hic
				quia, ab provident iure eum vitae magni quis repellendus.
				Exercitationem blanditiis autem nesciunt atque praesentium
				architecto ea culpa ipsum quis numquam dicta repudiandae vel beatae
				deserunt veritatis ex, aspernatur nam consequuntur nisi eius officia
				quia vitae esse quod? Fuga praesentium placeat quos asperiores
				laboriosam aspernatur enim adipisci quasi sunt voluptas soluta
				maxime, corrupti, nemo expedita ab minima impedit voluptatibus
				laudantium, voluptatum excepturi ratione. Maxime, beatae?
			</p>
		</section>
	);
}
