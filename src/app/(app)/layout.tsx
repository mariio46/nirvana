import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <nav className='flex h-16 w-full items-center justify-between border-b border-b-zinc-300 bg-zinc-100 px-8'>
                <div>
                    <Link href={'/'}>
                        <h1 className='text-xl font-bold uppercase'>Codex</h1>
                    </Link>
                </div>
                <div>
                    <ul className='flex items-center gap-x-2'>
                        <Link href={'/'} className=' px-4 py-2 font-medium'>
                            <li>Home</li>
                        </Link>
                        <Link href={'/posts'} className=' px-4 py-2 font-medium'>
                            <li>Posts</li>
                        </Link>
                        <Link href={'/products'} className=' px-4 py-2 font-medium'>
                            <li>Products</li>
                        </Link>
                    </ul>
                </div>
            </nav>
            <main className='flex  items-center justify-center'>{children}</main>
        </div>
    );
}
