import { p as prisma } from './save-subscription-email_BiNSkUhE.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.json();
    const {
      name,
      email,
      currentResidence,
      linkedinUrl,
      role,
      bio,
      experience,
      motivation,
      image,
      cv
    } = data;
    const newUser = await prisma.volunteer.create({
      data: {
        name,
        email,
        currentResidence,
        linkedinUrl,
        role,
        bio,
        experience,
        motivation,
        image,
        cv
      }
    });
    return new Response(JSON.stringify(newUser), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

export { POST };
