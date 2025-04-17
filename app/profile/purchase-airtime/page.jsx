"use client";
import { useFormik } from "formik";
import { purchaseValidation } from "@/constants/formikValidaton";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";
import { useState } from "react";

function PurchaseAirtime() {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      phone: "",
      amount: "",
      network: "",
    },
    validate: purchaseValidation,
    onSubmit,
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const res = await fetch("/api/airtime-purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setLoading(false);
        router.push("/profile");
      }
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("[Register_Frond_error]", error);
      toast.error("failed to purchase, try again");
    }
  }

  return (
    <div className="w-full md:flex items-center justify-center md:p-20">
      <div className="w-full h-[70vh] md:h-screen md:w-[35%] bg-slate-50 rounded-t-4xl absolute bottom-0 md:flex md:items-center md:justify-center md:flex-col">
        <Link href="/profile" className="flex items-center px-6 py-12">
          <ChevronLeftIcon className="text-slate-600" />
          <p className="text-lg text-slate-600 font-semibold">Back</p>
        </Link>
        <p className="text-center text-3xl font-bold text-blue-800 mb-3 mt-6">
          Purchase Airtime
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className="w-full items-center  gap-3 mt-12 justify-center flex px-8 flex-col"
        >
          <div className="w-full">
            <label className="text-md my-3 text-slate-500">Phone Number</label>
            <input
              type="text"
              className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-2 border-slate-300 w-full"
              placeholder="please enter your phone number"
              {...formik.getFieldProps("phone")}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <span className="text-sm py-1 text-rose-600">
                {formik.errors.phone}
              </span>
            ) : (
              ""
            )}
          </div>
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

          <div className="w-full flex flex-col gap-1 text-slate-700">
            <label className="text-md my-3 text-slate-500">Network</label>
            <select
              {...formik.getFieldProps("network")}
              className="outline-none"
            >
              <option value="" disabled>
                Select Network
              </option>
              <option value="1">MTN</option>
              <option value="4">Airtel</option>
              <option value="2">Glo</option>
              <option value="3">9mobile</option>
            </select>
            {formik.errors.network && formik.touched.network ? (
              <span className="text-sm py-1 text-rose-600">
                {formik.errors.network}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="w-full md:[60%]">
            <button
              disabled={Loading}
              type="submit"
              className="w-full flex items-center justify-center hover:bg-blue-950 bg-blue-800 text-slate-100 p-2.5 mt-5 rounded-2xl"
            >
              {Loading ? <Loader /> : "Purchase"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PurchaseAirtime;
