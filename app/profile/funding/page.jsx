"use client";
import { useFormik } from "formik";
import { fundingValidation } from "@/constants/formikValidaton";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

function FundingWallet() {
  const [Loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      amount: "",
    },
    validate: fundingValidation,
    onSubmit,
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const res = await fetch("/api/funding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const response = await res.json();
      if (response.authorization_url) {
        setLoading(false);
        window.location.href = response.authorization_url;
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      setLoading(false);
      console.log("[Funding_frond_error]", error);
    }
  }

  return (
    <div className="w-full">
      <div className="w-full h-[60vh] md:h-screen md:w-[35%] bg-slate-50 rounded-t-4xl absolute bottom-0 md:flex md:items-center md:justify-center md:flex-col">
        <Link href="/profile" className="flex items-center px-6 py-12">
          <ChevronLeftIcon className="text-slate-600" />
          <p className="text-lg text-slate-600 font-semibold">Back</p>
        </Link>
        <p className="text-center text-3xl font-bold text-blue-800 mb-3 mt-6">
          Funding Account
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full items-center  gap-3 mt-12 justify-center flex px-8 flex-col"
        >
          <div className="w-full">
            <label className="text-md my-3 text-slate-500">Amount</label>
            <input
              type="text"
              className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-2 border-slate-300 w-full"
              placeholder="please enter your amount"
              {...formik.getFieldProps("amount")}
            />
            {formik.errors.amount && formik.touched.amount ? (
              <span className="text-sm py-1 text-rose-600">
                {formik.errors.amount}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="w-full md:[60%]">
            <button
              type="submit"
              className="w-full flex items-center justify-center hover:bg-blue-950 bg-blue-800 text-slate-100 p-2.5 mt-5 rounded-2xl"
            >
              {Loading ? <Loader /> : "Deposit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FundingWallet;
