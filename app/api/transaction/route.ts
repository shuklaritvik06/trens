import { BLAZE_CHAIN_INSIGHTS_URI } from "@/constants/trens.constants";
import { validateChain, validateDate } from "@/utils/trens.utils";
import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { chain, start_date, end_date } = await request.json();
    if (!validateChain(chain)) {
      return NextResponse.json(
        { error: "Invalid chain provided" },
        { status: 400 }
      );
    }
    if (!validateDate(start_date) || !validateDate(end_date)) {
      return NextResponse.json(
        { error: "Invalid date format provided" },
        { status: 400 }
      );
    }
    const response = await axios.get(
      BLAZE_CHAIN_INSIGHTS_URI + "/transaction_count",
      {
        data: { chain, start_date, end_date },
        headers: {
          "x-api-key": `${process.env.GRAPHQL_API_KEY}`,
        },
      }
    );
    return NextResponse.json(response.data, { status: 200 });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
