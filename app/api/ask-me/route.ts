import { NextResponse } from "next/server";

const ASK_ME_API_URL = process.env.ASK_ME_API_URL;

export async function POST(req: Request) {
    try {
        if (!ASK_ME_API_URL) {
            return NextResponse.json(
                { error: "ASK_ME_API_URL is not configured." },
                { status: 500 }
            );
        }

        const body = await req.json();
        const prompt = body?.prompt;

        if (!prompt || typeof prompt !== "string") {
            return NextResponse.json(
                { error: "Prompt is required." },
                { status: 400 }
            );
        }

        if (prompt.length > 1000) {
            return NextResponse.json(
                { error: "Prompt is too long." },
                { status: 400 }
            );
        }

        const response = await fetch(ASK_ME_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: "Ask Me API returned an error.", details: data },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Ask Me API route error:", error);

        return NextResponse.json(
            { error: "Failed to call Ask Me API." },
            { status: 500 }
        );
    }
}