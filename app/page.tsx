import { getActiveSubscription } from "@/actions/sub";
import { auth } from "@/auth";
import { buttonVariants } from "@/components/ui/button";
import { headers } from "next/headers";
import Link from "next/link";
import CancelSubButton from "@/components/cancel-sub-button";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const data = await getActiveSubscription();
	const activeSub = data.subscription;

	return (
		<main className="flex items-center justify-center grow p-8">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-7xl">Hello</h1>
				<p>You are logged in as: {session?.user?.email}</p>
				{activeSub ? (
					<div className="border border-gray-200 rounded-xl p-8 shadow-lg bg-gradient-to-br from-white to-gray-50 max-w-md w-full transition-all hover:shadow-xl space-y-4">
						<div className="flex items-center justify-between mb-4">
							<h2 className="text-2xl font-bold text-gray-800">
								{activeSub.plan.charAt(0).toUpperCase() +
									activeSub.plan.slice(1)}{" "}
								Plan
							</h2>
							<div
								className={`px-3 py-1 rounded-full text-xs font-medium ${
									activeSub.status === "active"
										? "bg-green-100 text-green-800"
										: activeSub.status === "trialing"
										? "bg-blue-100 text-blue-800"
										: "bg-gray-100 text-gray-800"
								}`}
							>
								{activeSub.status}
							</div>
						</div>

						<div className="space-y-4 mt-6">
							<div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
								<span className="text-gray-600 flex items-center">
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M13 10V3L4 14h7v7l9-11h-7z"
										/>
									</svg>
									Status
								</span>
								<span className="font-semibold text-gray-800 capitalize">
									{activeSub.status}
								</span>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
								<span className="text-gray-600 flex items-center">
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
										/>
									</svg>
									Auto-renew
								</span>
								<span className="font-semibold text-gray-800">
									{activeSub.cancelAtPeriodEnd ? "No" : "Yes"}
								</span>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
								<span className="text-gray-600 flex items-center">
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Tokens
								</span>
								<span className="font-semibold text-gray-800">
									{/* TODO: Extend Subscription type of better-auth to include this limits field. */}
									{activeSub.limits?.tokens || "N/A"} per month
								</span>
							</div>

							<div className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm">
								<span className="text-gray-600 flex items-center">
									<svg
										className="w-4 h-4 mr-2"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
										/>
									</svg>
									Seats
								</span>
								<span className="font-semibold text-gray-800">
									{activeSub.seats}
								</span>
							</div>
						</div>

						{activeSub.cancelAtPeriodEnd ? (
							<p className="text-red-400 text-xs">
								Your subscription will be cancelled on:{" "}
								{activeSub.periodEnd?.toLocaleDateString()}
							</p>
						) : (
							<CancelSubButton />
						)}
					</div>
				) : (
					<div className="border border-gray-200 rounded-xl p-8 shadow-md bg-white max-w-md w-full text-center">
						<p className="text-lg text-gray-600">
							You don't have an active subscription plan.
						</p>
						<Link
							href="/plans"
							className={buttonVariants({ variant: "default" })}
						>
							View Plans
						</Link>
					</div>
				)}
			</div>
		</main>
	);
}
