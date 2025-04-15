import { connectToDB } from "@/database/Connect-database";
import User from "@/schema/register-schema";
import axios from "axios";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req) => {
  const { name, email, phone, password, cpassword } = await req.json();
  console.log(name, email, phone, password, cpassword);
  try {
    if (!name || !email || !phone || !password || !cpassword) {
      return new NextResponse("All fields are required", { status: 401 });
    }

    await connectToDB();

    const newPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      phone,
      password: newPassword,
    });

    await newUser.save;

    return new NextResponse(
      {
        message: "account created successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("[Register_backend_error]", error);
    return new NextResponse("internal server error", { status: 500 });
  }
};
