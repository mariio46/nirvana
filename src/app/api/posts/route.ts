import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const posts = await prisma.post.findMany({});
    return NextResponse.json({ posts: posts });
}

export const POST = async (req: NextRequest) => {
    const { title, content } = await req.json();

    const posts = await prisma.post.create({
        data: {
            title,
            content,
        },
    });

    return NextResponse.json({ posts: posts });
};

export const DELETE = async (req: NextRequest) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get('id')) || 0;

    const product = await prisma.product.delete({
        where: {
            id: id,
        },
    });

    if (!product) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }

    return NextResponse.json({});
};
