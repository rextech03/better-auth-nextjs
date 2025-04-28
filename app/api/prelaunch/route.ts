import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get operation to retrieve all products
export const GET = async (req: Request) => {
    try {
        const prelaunch = await prisma.prelaunch.findMany();
return NextResponse.json({
            prelaunch
        });
    } catch (error: any) {
        return NextResponse.json({
            msg: 'Failed to retrieve prelaunch data',
            error: error.message
        }, { status: 500 });
    }
};


// Post operation to create a new product

export const POST = async (req: Request) => {
    try {
        const { productId, phone, email } = await req.json();
       
        
        const productsPrelaunch = await prisma.prelaunch.create({
            data: {
                productId,
                phone,
                email
            }
        });
        return NextResponse.json({
            productsPrelaunch
            // existProduct
        });
        } catch (error: any) {
        return NextResponse.json({
            msg: 'Failed to create product',
            error: error.message
        }, { status: 500 });
    }
};


// Put operation to edit the product
export const PUT = async (req: Request) => {
    try {
        const { id, productId, email } = await req.json();
        if (!id || !productId) {
            return NextResponse.json({
                msg: 'Invalid input data'
            }, { status: 400 });
        }
        const author = await prisma.prelaunch.update({
            where: { id: String(id) },
            data: { email }
        });
        return NextResponse.json({
            msg: `The updated product name is ${author.email}`
        });
    } catch (error: any) {
        return NextResponse.json({
            msg: 'Failed to update the product',
            error: error.message
        }, { status: 500 });
    }
};

// Delete operation to delete the product
export const DELETE = async (req: Request) => {
    try {
        const { id } = await req.json();
await prisma.prelaunch.deleteMany({
            where: { id: id }
        });
         await prisma.prelaunch.delete({
            where: { id: id }
        });
        return NextResponse.json({
            msg: `The author with id ${id} and all related books have been deleted`
        });
    } catch (error: any) {
        return NextResponse.json({
            msg: 'Failed to delete the author',
            error: error.message
        }, { status: 500 });
    }
};

// get single product by id
// export const GET = async (req: Request) => {
//     try {
        
//         const urlParts = req.url.split('/');
//         const id = Number(urlParts[5]);
// if (isNaN(id)) {
//             return NextResponse.json({
//                 msg: 'Invalid author ID'
//             }, { status: 400 }); 
//         }
//         const author = await prisma.author.findUnique({
//             where: {
//                 id: id
//             },
//             include: {
//                 books: true
//             }
//         });
//         if (!author) {
//             return NextResponse.json({
//                 msg: 'Author not found'
//             }, { status: 404 }); 
//         }
//         return NextResponse.json({
//             msg: author
//         });
//     } catch (error) {
        
//         if (error instanceof Error) {
//             return NextResponse.json({
//                 msg: 'Failed to fetch the author',
//                 error: error.message
//             }, { status: 500 });
//         } else {
//             return NextResponse.json({
//                 msg: 'An unknown error occurred'
//             }, { status: 500 });
//     }
// }
// };