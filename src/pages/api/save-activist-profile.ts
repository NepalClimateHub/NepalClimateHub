import type { APIRoute } from "astro";
import prisma from "../../server/prismaClient";

export const POST: APIRoute = async ({ request }) => {
	try {
		const data = await request.json();
		const {
			name,
			email,
			address,
			phoneNumber,
			linkedinUrl,
			facebookUrl,
			instagramUrl,
			website,
			workingThemes,
			bio,
			cardPicture,
			profilePicture,
		} = data;

		const newActivist = await prisma.activist.create({
			data: {
				name,
				email,
				address,
				phoneNumber,
				linkedinUrl,
				facebookUrl,
				instagramUrl,
				website,
				workingThemes,
				bio,
				cardPicture,
				profilePicture,
			},
		});

		return new Response(JSON.stringify(newActivist), {
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
