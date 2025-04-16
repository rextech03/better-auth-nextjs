import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


export const GET = async (req: Request) => {
    try {
        const users = await prisma.user.findMany();
return NextResponse.json({
            users
        });
    } catch (error: any) {
        return NextResponse.json({
            msg: 'Failed to retrieve users',
            error: error.message
        }, { status: 500 });
    }
};
