// "use server";

// import { addProjectSchema } from "@/lib/zod";



// export async function submitForm(formData: FormData) {
//   const data = {
//     name: formData.get("email") as string,
//     description: formData.get("message") as string,
//     logo: formData.get("logo") as string,
//     stage: formData.get("stage") as string,
//     link: formData.get("link") as string,
//     userId: formData.get("userId") as string,

//   };

//   const result = addProjectSchema.safeParse(data);

//   if (!result.success) {
//     return { error: "Invalid form data" };
//   }

//   try {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users", {
//       method: "POST",
//       body: JSON.stringify({
//         email: data.email,
//         message: data.message,
//       }),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!res.ok) throw new Error("Submission failed");

//     return { success: true };
//     //return data sent by the api here or you can just redirect from here
//     // redirect("/dashboard") //next/navigation
//   } catch (error) {
//     return { error: "Something went wrong. Please try again." };
//   }
// }