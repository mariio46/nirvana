import { Product } from '@prisma/client';
import Link from 'next/link';
import ProductItem from './_item';

async function getProducts() {
    const res = await fetch(`${process.env.BASE_URL}/api/products`, { next: { revalidate: 0 } });
    const json = res.json();
    return json;
}

export default async function ProductPage() {
    const { products } = await getProducts();
    return (
        <div className='mx-auto max-w-7xl py-20'>
            <Link href={'/products/create'} className='rounded-md bg-zinc-900 px-3 py-2 text-white hover:bg-zinc-800'>
                New Product
            </Link>
            <div className='mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3'>
                {products?.map((product: Product, index: number) => <ProductItem key={index} product={product} />)}
            </div>
        </div>
    );
}
