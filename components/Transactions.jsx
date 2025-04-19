"use client";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";

function Transactions() {
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/get-transactions");
        const data = await res.json();
        console.log(data);
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

  return (
    <div className="text-slate-700 py-4 px-6">
      <div className="w-full flex items-center justify-between">
        <p className="text-2xl font-semibold">Recent Transactions</p>
        <p className="text-lg">See all</p>
      </div>
      {Loading ? (
        <div className="w-full h-[360px] flex items-center justify-center">
          {" "}
          <Loader2 className="w-10 h-10 animate-spin text-blue-400" />{" "}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-3 lg:grid-cols-3 justify-center content-center w-full">
          {Data.length > 0 ? (
            Data.map((transaction, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 px-6 rounded-3xl bg-slate-200/50"
              >
                <span>
                  <p className="text-xl font-bold text-slate-600">
                    {transaction?.type}
                  </p>
                  <p className="text-slate-400 text-md">
                    {new Date(transaction?.createdAt).toLocaleDateString(
                      "en-GB",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      }
                    )}
                  </p>
                </span>
                <p
                  className={`${
                    transaction?.type === "deposit"
                      ? "text-xl text-green-400 font-bold"
                      : "text-xl text-rose-400 font-bold"
                  }`}
                >
                  {transaction?.type === "withdrawal" ? "-₦" : "+₦"}
                  {transaction?.amount}
                </p>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center w-full h-[360px] p-4 px-6 rounded-3xl bg-slate-200/50">
              <p className="text-slate-700 text-2xl font-bold">
                No Transaction Found
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Transactions;
