import { Post } from "@/types/post";

const posts: Post[] = [
	{
		id: 1,
        slug: 'first-post',
		title: 'First Post',
		content: 'This is the content of the first post.',
		author: 'John Doe',
		date: '2023-06-01',
	},
	{
		id: 2,
        slug: 'second-post',
		title: 'Second Post',
		content: 'This is the content of the second post.',
		author: 'Jane Smith',
		date: '2023-06-02',
	},
	{
		id: 3,
        slug: 'third-post',
		title: 'Third Post',
		content: 'This is the content of the third post.',
		author: 'David Johnson',
		date: '2023-06-03',
	},
];

import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(posts);
}