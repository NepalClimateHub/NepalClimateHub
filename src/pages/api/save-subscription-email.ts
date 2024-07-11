import type { APIRoute } from "astro";
import prisma from "../../server/prismaClient";

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		const { email } = data;

		const newUserEmail = await prisma.emailSubscription.create({
			data: {
				email,
			},
		});

		return new Response(JSON.stringify(newUserEmail), {
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.error("Error processing request:", error);
		return new Response(
			JSON.stringify({ error: "Failed to process request" }),
			{
				status: 500,
				headers: { "Content-Type": "application/json" },
			}
		);
	}
};
