import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const clientUrl = new URL(req.url, "http://localhost:3000");
    const apiUrl = new URL(
      process.env.NEXT_PUBLIC_MOVIE_KMDB_API_SERVER as string
    );

    clientUrl.searchParams.forEach((value, key) => {
      apiUrl.searchParams.append(key, value);
    });

    apiUrl.searchParams.append(
      "ServiceKey",
      process.env.NEXT_PUBLIC_MOVIE_KMDB_API_KEY as string
    );

    const res = await fetch(apiUrl.toString());
    const data = await res.json();
    return Response.json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500
      });
    } else {
      console.error(error);
      return new Response(JSON.stringify({ error: "Unknown error" }), {
        status: 500
      });
    }
  }
}
