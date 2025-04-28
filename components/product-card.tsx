"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleXIcon, HeartIcon, LinkIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

// const product = {
//   name: "Red Hat",
//   link: "#",
//   logo: "/globe.svg",
//   stage: "PRELAUNCH",
//   description: "An awesome product that you will love.",
// };

interface Product {
  id: string;
  name: string;
  link: string | null;
  logo: string;
  stage: string;
  description: string;
};

export default function ProductCard( product : Product ) {


  const handleCancel = async () => {
  // Handle cancel action here

  try {
  
    const res = await fetch('/api/products/', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'id' : product.id}),
    })
    if (res.ok) {
        toast({
            title: "Product Deleted",
            description: "Your product has been deleted successfully.",
        })
    } else {
        toast({
            title: "Error",
            description: "There was an error deleting your product.",
        })
    }
    
} catch (error) {
    console.log(error);
}
 
    // console.log("Cancelled product:", product.id);
  }

  
  return (
    <Card className="w-[200px] group relative space-y-4 overflow-hidden">
      <figure className="group-hover:opacity-90">
        <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black">
          <CircleXIcon  className="size-4" />
        </Button>

        {/* Cancel button */}
        {/* <Button
          onClick={handleCancel}
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 start-3 rounded-full dark:text-black">
          <HeartIcon className="size-4" />
        </Button> */}

        <Image
          className="aspect-square w-full"
          // src={product.logo}
          src={'/globe.svg'}
          width={150}
          height={150}
          alt={product.name}
        />
      </figure>
      <CardContent className="px-4 py-0">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg">
              <Link href={product.link! == null ? "#" : product.link} >
                {/* <span aria-hidden="true" className="absolute inset-0" /> */}
                {product.name}
              </Link>
            </h3>
            
          </div>
          <p className="text-xs font-semibold">{product.stage}</p>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="p-0 border-t">
        <Link href={'/stages'} className="w-full flex items-center justify-center rounded-xl text-center py-4">
          <LinkIcon className="size-4 me-1" /> Access Product 
        </Link>

        
      </CardFooter>
    </Card>
  );
}
