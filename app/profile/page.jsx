"use client";
import { Bell, Copy, Plus, Search } from "lucide-react";
import Transactions from "@/components/Transactions";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import ComponentLoader from "@/components/ComponentLoader";

function Profile() {
  const { data: session } = useSession();
  const [Data, setData] = useState();
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/get-user");
        const data = await res.json();
        if (res.ok) {
          setData(data);
          setLoading(false);
        }
      } catch (error) {
        console.log("[GET_user_frond_error]", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (Loading) {
    return (
      <div className="w-full items-center justify-center h-[90vh]">
        <ComponentLoader />
      </div>
    );
  }
  return (
    <div className="w-full py-6 min-h-screen bg-slate-50">
      <div>
        <div className="flex items-center justify-between p-4 px-6 ">
          <span>
            <p className="text-2xl font-bold text-slate-600">Hello,</p>
            <p className="text-slate-600 font-bold text-xl">
              {session?.user?.name}
            </p>
          </span>

          <div className="flex items-center justify-center gap-2">
            <span className="p-2 rounded-full bg-slate-200">
              <Search className="text-slate-600" />
            </span>
            <span className="p-2 rounded-full bg-slate-200">
              <Bell className="text-slate-600" />
            </span>
            <button
              onClick={signOut}
              type="button"
              className="bg-indigo-300 text-center w-20 p-1 rounded-lg text-white"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="w-full mt-4 px-6">
          <div className="w-full p-6 flex items-center justify-between rounded-3xl bg-gradient-to-r from-gray-300 to-indigo-500/50">
            <div className="flex flex-col gap-2">
              <p className="text-xl font-bold text-slate-500">
                Current Balance
              </p>
              <p className="text-3xl text-slate-500 font-bold">
                $
                {Data?.balance.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
            <Link
              href="/profile/funding"
              className="p-2 rounded-full hover:bg-slate-300 bg-slate-200"
            >
              <Plus className="text-slate-700" />
            </Link>
          </div>
        </div>
        {/* <div className="flex items-center justify-between p-4 px-6 ">
          <span>
            <p className="text-xl  text-slate-700">Account Number</p>
            <p className="text-slate-600 text-2xl">8030420079</p>
          </span>
          <span className="p-2 rounded-full bg-slate-100">
            <Copy className="text-slate-600" />
          </span>
        </div> */}

        <div className="w-full md:w-[60%] px-6 py-4">
          <Link href="/profile/purchase-airtime">
            <button
              type="button"
              className="w-full font-bold p-2 rounded-3xl bg-gradient-to-r hover:bg-gradient-to-r hover:from-gray-400 hover:to-indigo-500/70 from-gray-300 to-indigo-500/50"
            >
              Purchase Airtime
            </button>
          </Link>
        </div>
        <Transactions />
      </div>
    </div>
  );
}

export default Profile;
