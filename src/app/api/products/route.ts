import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const products = await prisma.product.findMany({});

    return NextResponse.json({ products: products });
}

export const POST = async (req: NextRequest) => {
    const { title, body, published } = await req.json();

    const products = await prisma.product.create({
        data: {
            title,
            body,
            published,
        },
    });

    return NextResponse.json({ products: products });
};

export const DELETE = async (req: NextRequest) => {
    const url = new URL(req.url).searchParams;
    const id = Number(url.get('id')) || 0;

    const posts = await prisma.post.delete({
        where: {
            id: id,
        },
    });

    if (!posts) {
        return NextResponse.json({ message: 'Error' }, { status: 500 });
    }

    return NextResponse.json({});
};
