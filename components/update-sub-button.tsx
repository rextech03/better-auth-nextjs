"use client";
import { updateExistingSubscription } from "@/actions/sub";
import { Plan } from "@/constants/plans";
import { toast } from "@/hooks/use-toast";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdateSubscription({
	buttonText,
	plan,
	subId,
}: {
	buttonText: string;
	plan: Plan;
	subId: string;
}) {
	const router = useRouter();
	const [isPending, setIsPending] = useState(false);

	const handleSubUpdate = async () => {
		try {
			setIsPending(true);
			const result = await updateExistingSubscription(subId, plan.priceId);
			console.log({ result });
			if (result.status) {
				toast({
					title: "Success",
					description: result.message || "Subscription updated successfully",
					variant: "default",
				});
				setTimeout(() => {
					router.refresh();
				}, 3000);
			} else {
				toast({
					title: "Error",
					description: result.message || "Failed to update subscription",
					variant: "destructive",
				});
			}
		} catch (err) {
			console.log(err);
			toast({
				title: "Error",
				description: "An unexpected error occurred",
				variant: "destructive",
			});
		} finally {
			setIsPending(false);
		}
	};
	return (
		<LoadingButton pending={isPending} onClick={handleSubUpdate}>
			{buttonText}
		</LoadingButton>
	);
}
