import { auth } from "@/auth";
import { CreateProductForm } from "@/components/create-product";
import ProductCard from "@/components/product-card";
import { headers } from "next/headers";

interface Product {
    id: string;
    name: string;
    link: string | null;
    logo: string;
    stage: string;
    description: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };

export default async function Dashboard() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const data = await fetch('http://localhost:3000/api/products')
    const result = await data.json()
    // const products = result.products as Product[];
    const products = result.products;
    // console.log(result.products);
    return (
        <main >
            <div className="flex flex-col items-center ">
                <h1 className="text-7xl">Welcome</h1>
                <p> {session?.user?.name}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-between gap-4 pl-8">

            <div className="grid">
                <h1 className="text-3xl mb-2">Create Product</h1>
               {/* <CreateProductForm  /> */}
               <CreateProductForm props={{ userId: session?.user?.id }} />
            </div>


            <div className="">
                <h1 className="text-3xl mb-2">Listed Product</h1>
                <div className="flex flex-wrap gap-4">
                {products.map((product: Product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
               </div>
            </div>
            
            </div>
        </main>
    );
}
