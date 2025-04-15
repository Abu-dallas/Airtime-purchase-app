import { NextResponse } from "next/server";
import { connectToDB } from "@/database/Connect-database";
import Transaction from "@/schema/transaction-schema";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);
  try {
    await connectToDB();
    const transaction = await Transaction.find({ userId: session?.user.id });
    return new NextResponse(JSON.stringify(transaction), { status: 200 });
  } catch (error) {
    console.log("[GET_Transctions_Backend_Error]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
