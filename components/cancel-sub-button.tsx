"use client";

import { authClient } from "@/auth-client";
import { Button } from "@/components/ui/button";

export default function CancelSubscription() {
	async function handleSubCancellation() {
		try {
			await authClient.subscription.cancel({
				returnUrl: "/",
			});
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<Button
			variant="destructive"
			className="w-full"
			onClick={handleSubCancellation}
		>
			Cancel subscription
		</Button>
	);
}
