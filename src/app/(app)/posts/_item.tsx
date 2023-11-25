'use client';

import { Post } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function PostItem({ post }: { post: Post }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async (id: number) => {
        setLoading(true);
        await fetch('/api/posts?id=' + id, {
            method: 'DELETE',
        });
        setLoading(false);
        router.refresh();
    };

    return (
        <div className='col-auto flex flex-col rounded-lg border border-zinc-300 p-5'>
            <h2 className='text-xs font-medium'>ID: {post.id}</h2>
            <h1 className='text-base font-bold '>{post.title}</h1>
            <p className='flex-1 text-sm tracking-wide'>{post.content}</p>
            <div className='mt-4 inline-flex gap-x-4'>
                <button
                    className='text-xs font-bold hover:text-zinc-800'
                    onClick={() => router.push(`/update/${post.id}`)}>
                    Update
                </button>
                <button
                    disabled={loading}
                    className='text-xs font-bold text-red-500 hover:text-red-400'
                    onClick={() => handleDelete(post.id)}>
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}
