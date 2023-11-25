'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductForm() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [published, setPublished] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const submit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);

        await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body, published }),
        })
            .then((res) => {
                console.log(res);
            })
            .catch((e) => {
                console.log(e);
                setLoading(false);
            });

        setLoading(false);
        router.push('/products');
        router.refresh();
    };

    return (
        <form className='space-y-4' onSubmit={submit}>
            <div>
                <label htmlFor='title' className='text-sm font-medium '>
                    Title
                </label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='block w-full rounded border border-zinc-400 px-2 py-2 text-sm transition duration-300 focus:outline-none focus:ring focus:ring-zinc-200'
                    type='text'
                    name='title'
                    id='title'
                    autoFocus
                    placeholder='The title'
                />
            </div>
            <div>
                <label htmlFor='body' className='text-sm font-medium '>
                    Body
                </label>
                <input
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className='block w-full rounded border border-zinc-400 px-2 py-2 text-sm transition duration-300 focus:outline-none focus:ring focus:ring-zinc-200'
                    type='text'
                    name='body'
                    id='body'
                    placeholder='The description of your product'
                />
            </div>
            <div className='flex items-center gap-x-2'>
                <input
                    type='checkbox'
                    name='published'
                    id='published'
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                />
                <label htmlFor='published' className='text-sm'>
                    Publish?
                </label>
            </div>
            <div className='flex items-center justify-end gap-x-2'>
                <button
                    disabled={title === '' ? true : body === '' ? true : loading}
                    className='rounded-lg bg-zinc-950 px-5 py-2 text-xs font-bold uppercase tracking-wide text-white transition duration-300 hover:bg-zinc-700 focus:ring focus:ring-zinc-900 focus:ring-offset-2 disabled:bg-zinc-950/50'>
                    {loading ? 'Loading...' : 'Save'}
                </button>
                <Link
                    href={'/products'}
                    className='rounded-lg border border-zinc-400 bg-transparent px-5 py-2 text-xs font-bold uppercase tracking-wide text-black transition duration-300 hover:bg-zinc-200 focus:ring focus:ring-zinc-900 focus:ring-offset-2'>
                    Back
                </Link>
            </div>
        </form>
    );
}
