'use client';

import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { changeName } from '@/redux/features/auth-slice';
import { RootState } from '@/redux/store';
import { useState } from 'react';

export default function Home() {
	const dispatch = useAppDispatch();
	const nameRedux = useAppSelector((state: RootState) => state);
	const [name, setName] = useState('');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleSubmit = () => {
		dispatch(changeName(name));
	};

	console.log(nameRedux);

	return (
		<main>
			<h1>Hello gius</h1>
			<div className='flex w-1/2 flex-col'>
				<div>
					<input
						type='text'
						placeholder="nom d'utilisateur"
						value={name}
						onChange={handleChange}
					/>
					<button onClick={handleSubmit}>Send name</button>
				</div>
				<div>
					<input type='text' placeholder='id' />
					<button>Send ID</button>
				</div>
			</div>
		</main>
	);
}
