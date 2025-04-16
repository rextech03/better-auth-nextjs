import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CircleXIcon, HeartIcon, LinkIcon } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

// const product = {
//   name: "Red Hat",
//   link: "#",
//   logo: "/globe.svg",
//   stage: "PRELAUNCH",
//   description: "An awesome product that you will love.",
// };

interface Product {
  name: string;
  link: string | null;
  logo: string;
  stage: string;
  description: string;
};

export default function ProductCard( product : Product ) {
  
  return (
    <Card className="w-[200px] group relative space-y-4 overflow-hidden">
      <figure className="group-hover:opacity-90">
        <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 end-3 rounded-full dark:text-black">
          <HeartIcon className="size-4" />
        </Button>

        {/* Cancel button */}
        {/* <Button
          variant="ghost"
          size="icon"
          className="bg-white/70 absolute top-3 start-3 rounded-full dark:text-black">
          <CircleXIcon className="size-4" />
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
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            
          </div>
          <p className="text-xs font-semibold">{product.stage}</p>
        </div>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardContent>
      <CardFooter className="p-0 border-t">
        <Button variant="ghost" className="w-full">
          <LinkIcon className="size-4 me-1" /> Visit Product
        </Button>
      </CardFooter>
    </Card>
  );
}
