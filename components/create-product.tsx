"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addProjectSchema } from "@/lib/zod"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"


// const FormSchema = z.object({
//   username: z.string().min(2, {
//     message: "Username must be at least 2 characters.",
//   }),
// })

export  function CreateProductForm({props}: {props: {userId: string | undefined}}) {
  const { userId } = props

      
  const form = useForm<z.infer<typeof addProjectSchema>>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      logo: "",
      link: "",
      userId: userId,
      stage: "PRELAUNCH",
    },
  })

  async function onSubmit(data: z.infer<typeof addProjectSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
    try {
        console.log( JSON.stringify(data));
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        if (res.ok) {
            toast({
                title: "Product Created",
                description: "Your product has been created successfully.",
            })
        } else {
            toast({
                title: "Error",
                description: "There was an error creating your product.",
            })
        }
        
    } catch (error) {
        console.log(error);
    }
  }



  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo Link</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your product name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
              <Textarea placeholder="Type your message here." {...field} />
              
              </FormControl>
              <FormDescription>
                This is description of your digital product. Your description should be between 20 - 500 characters .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo link</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your product logo link.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Link (Link to playstore, if it is an app)</FormLabel>
              <FormControl>
                <Input placeholder="https://product.co" {...field} />
              </FormControl>
              <FormDescription>
                This is your product link.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
<FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stage</FormLabel>
              <FormControl>
              <Select {...field}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a stage " />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Product Stage</SelectLabel>
          <SelectItem value="PRELAUNCH">PRE LAUNCH</SelectItem>
          <SelectItem value="LAUNCH">LAUNCH</SelectItem>
          <SelectItem value="POSTLAUNCH">POST LAUNCH</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
                {/* <Input placeholder="PRELAUNCH" {...field} /> */}
              </FormControl>
              <FormDescription>
                This is your product stage.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userId"
          render={() => (
            <FormItem>
              {/* <FormLabel>Product Link (Link to playstore, if it is an app)</FormLabel> */}
              <FormControl>
                <Input type="hidden"  value={userId} 
                // {...field} 
                />
              </FormControl>
              <FormDescription>
                {/* This is your product link. */}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
  )
}
