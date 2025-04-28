"use client";

import { authClient } from "@/auth-client";
import Link from "next/link";
import SignoutButton from "@/components/signout-button";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
	const { data, isPending } = authClient.useSession();
	if (isPending) return <div>Loading...</div>;

	const session = data;

	return !session ? (
		<div className="flex gap-2 justify-center">
			<Link href="/sign-in">
				<Button>Sign In</Button>
			</Link>
			<Link href="/sign-up">
				<Button>Sign Up</Button>
			</Link>
		</div>
	) : (
		<div className="flex items-end gap-2">
			{/* <p className="text-md block">{session.user?.name}</p> */}
			<Link href="/dashboard" className="text-md text-gray-500 hover:underline hover:text-black">
				Dashboard
			</Link>
			<SignoutButton />
		</div>
	);
}
