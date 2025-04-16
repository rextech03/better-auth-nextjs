import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get operation to retrieve all products
export const GET = async (req: Request) => {
    try {
        const products = await prisma.product.findMany();
return NextResponse.json({
            products
        });
    } catch (error: any) {
        return NextResponse.json({
            msg: 'Failed to retrieve products',
            error: error.message
        }, { status: 500 });
    }
};


// Post operation to create a new product
// export const POST = async (req: Request) => {
//     try {
//         const { name, logo, description, stage, link, userId } = await req.json();
//         const products = await prisma.product.create({
//                         data: {
//                             name,
//                             description,
//                             stage,
//                             logo,
//                             userId
//                         }
//                     });
//         return NextResponse.json({
//                         name, logo, description, stage, userId
//                     });
//     }
//     catch (error: any) {
//         return NextResponse.json({
//             msg: 'Failed to create product',
//             error: error.message
//         }, { status: 500 });
//     }
// };

export const POST = async (req: Request) => {
    try {
        const { name, logo, description, stage, link, userId } = await req.json();
        //  const existProduct = await prisma.product.findFirst({
        //     where: {
        //         name: name
        //     }
        // });
        // if (existProduct) {
        //     return NextResponse.json({
        //         msg: "Please enter new product"
        //     }, { status: 400 });
        // }
        
        const products = await prisma.product.create({
            data: {
                name,
                description,
                stage,
                logo,
                link,
                userId
            }
        });
        return NextResponse.json({
            products
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
        const { id, name } = await req.json();
        if (!id || !name) {
            return NextResponse.json({
                msg: 'Invalid input data'
            }, { status: 400 });
        }
        const author = await prisma.author.update({
            where: { id: String(id) },
            data: { name }
        });
        return NextResponse.json({
            msg: `The updated product name is ${author.name}`
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
await prisma.book.deleteMany({
            where: { authorId: Number(id) }
        });
        const author = await prisma.author.delete({
            where: { id: Number(id) }
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