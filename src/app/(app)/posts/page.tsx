import { Post } from '@prisma/client';
import Link from 'next/link';
import PostItem from './_item';

async function getPosts() {
    const res = await fetch(`${process.env.BASE_URL}/api/posts`, { next: { revalidate: 0 } });
    const json = await res.json();
    return json;
}

export default async function PostPage() {
    const { posts } = await getPosts();
    return (
        <div className='mx-auto max-w-7xl py-20'>
            <Link href={'/posts/create'} className='rounded-md bg-zinc-900 px-3 py-2 text-white hover:bg-zinc-800'>
                New Post
            </Link>
            <div className='mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3'>
                {posts?.map((post: Post, index: number) => <PostItem key={index} post={post} />)}
            </div>
        </div>
    );
}
