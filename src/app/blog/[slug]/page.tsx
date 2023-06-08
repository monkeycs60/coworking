import { Post } from '@/types/post';

interface Props {
	params: {
		slug: string;
	};
}
export default async function BlogPostPage({ params }: Props) {
	const posts: Post[] = await fetch('http://localhost:3000/api/content').then(
		(res) => res.json()
	);
	const post = posts.find((post) => post.slug === params.slug)!;
	return (
		<div className='mx-auto h-[600px] w-1/2 bg-yellow-200'>
			<p>hjello</p>
			<h1>{post.title}</h1>
			<p>{post.content}</p>
			<p>{post.author}</p>
		</div>
	);
}
