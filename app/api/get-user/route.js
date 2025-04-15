import { NextResponse } from "next/server";
import { connectToDB } from "@/database/Connect-database";
import User from "@/schema/register-schema";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const GET = async (req) => {
  const session = await getServerSession(authOptions);

  try {
    await connectToDB();
    const user = await User.findById(session?.user.id).select("-password");
    return new NextResponse(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log("[GET_User_Backend_Error]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
