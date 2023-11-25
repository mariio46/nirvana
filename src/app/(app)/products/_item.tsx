'use client';

import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProductItem({ product }: { product: Product }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const handleDelete = async (id: number) => {
        setLoading(true);
        await fetch(`/api/products?id=${id}`, {
            method: 'DELETE',
        });
        setLoading(false);
        router.refresh();
    };
    return (
        <div className='col-auto flex flex-col rounded-lg border border-zinc-300 p-5'>
            <h2 className='text-xs font-medium'>
                Status:{' '}
                <span className={`${product.published ? 'font-semibold text-green-500' : 'text-yellow-600'}`}>
                    {product.published ? 'Published' : 'Pending'}
                </span>
            </h2>
            <h1 className='mt-2 text-base font-bold'>{product.title}</h1>
            <p className='flex-1 text-sm tracking-wide'>{product.body}</p>
            <div className='mt-4 inline-flex gap-x-4'>
                <button
                    className='text-xs font-bold hover:text-zinc-800'
                    onClick={() => router.push(`/update/${product.id}`)}>
                    Update
                </button>
                <button
                    disabled={loading}
                    className='text-xs font-bold text-red-500 hover:text-red-400'
                    onClick={() => handleDelete(product.id)}>
                    {loading ? 'Deleting...' : 'Delete'}
                </button>
            </div>
        </div>
    );
}
