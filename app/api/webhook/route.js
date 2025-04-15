import crypto from "crypto";
import { NextResponse } from "next/server";
import Transaction from "@/schema/transaction-schema";
import { connectToDB } from "@/database/Connect-database";
import User from "@/schema/register-schema";

export const config = {
  api: {
    bodyParser: false,
  },
};

export const POST = async (req) => {
  try {
    const rawBody = await req.arrayBuffer();
    const bodyString = Buffer.from(rawBody).toString();
    const jsonBody = JSON.parse(bodyString);

    const paystack_secret_key = process.env.PAYSTACK_SECRET;
    const cryptoSignature = crypto
      .createHmac("sha512", paystack_secret_key)
      .update(bodyString)
      .digest("hex");

    const signature = await req.headers.get("x-paystack-signature");
    if (cryptoSignature !== signature) {
      return new NextResponse("invalid signature", { status: 401 });
    }

    if (jsonBody.data?.status === "success") {
      const data = jsonBody.data;
      const userId = data?.metadata.userId;
      const amount = data?.amount / 100;
      const reference = data?.reference;

      await connectToDB();
      const newTransaction = await Transaction.create({
        userId,
        amount,
        reference,
        status: "success",
        type: "deposit",
      });
      await newTransaction.save();
      let balanceUpdate = await User.findById(userId);
      if (balanceUpdate) {
        balanceUpdate.balance = balanceUpdate.balance + amount;
      }
      await balanceUpdate.save();
    }

    return new NextResponse("Webhook Transction is successful", {
      status: 200,
    });
  } catch (error) {
    console.log("[Webhook_API_Error]", error);

    return new NextResponse("internal server error", { status: 500 });
  }
};
