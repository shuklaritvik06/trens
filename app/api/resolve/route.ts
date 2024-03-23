import Moralis from "moralis";
import { NextResponse } from "next/server";

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { domain } = await request.json();
    const response = await Moralis.EvmApi.resolve.resolveENSDomain({
      domain: domain,
    });

    if (!response?.raw.address) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
    return NextResponse.json({ ...response?.raw });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
