import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import axios from "axios";
import { connectToDB } from "@/database/Connect-database";
import User from "@/schema/register-schema";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req, res) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const sessionEmail = session?.user.email;
  const sessionId = session?.user?.id;

  const { amount } = await req.json();

  if (!amount) {
    return new NextResponse("amount is required", { status: 404 });
  }
  try {
    await connectToDB();
    const user = await User.findOne({ email: sessionEmail });

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user?.email,
        amount: amount * 100, // in kobo
        metadata: {
          name: user?.name,
          phone: user?.phone,
          userId: sessionId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );
    const { authorization_url, reference } = response?.data.data;

    return new NextResponse(
      JSON.stringify({
        message: "transaction initialized",
        authorization_url: authorization_url,
        reference: reference,
      })
    );
  } catch (error) {
    console.log("[Funding_Backend_error]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
