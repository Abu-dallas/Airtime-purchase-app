import { connectToDB } from "@/database/Connect-database";
import axios from "axios";
import { NextResponse } from "next/server";
import User from "@/schema/register-schema";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const POST = async (req) => {
  const session = await getServerSession(authOptions);
  const { amount, phone, network } = await req.json();
  try {
    await connectToDB();
    const user = await User.findById(session?.user.id);
    if (!user) {
      return new NextResponse("Unauthorize access", { status: 401 });
    }
    if (user.balance < amount) {
      return new NextResponse(
        JSON.stringify({ message: "Insufficient balance in your account" }),
        { status: 406 }
      );
    }
    const apiKey = process.env.MASKAWA_API_KEY;
    console.log("api key:", apiKey);
    const response = await fetch("https://www.maskawasub.com/api/topup/", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        network: network,
        mobile_number: phone,
        airtime_type: "VTU",
        Ported_number: true,
      }),
    });

    const data = await response.json();
    console.log("[RESPONSE_DATA]", data);
    console.log(response);
    if (response.ok) {
      user.balance -= amount;
      await user.save();
    }
    if (!response.ok) {
      return new NextResponse(
        JSON.stringify({
          message: "You can't topup due to insufficient balance by vendor",
        }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify(
        {
          data: data,
          message: "Airtime purchased successfully",
        },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log("[purchase_backend_error]", error);
    console.log(error.response.data);
    return new NextResponse("internal server errror", { status: 500 });
  }
};
