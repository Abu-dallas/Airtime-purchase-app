import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="max-md:bg-[url('/bg2.jpg')] w-full h-screen bg-cover relative"></div>
      <div className="w-full h-screen absolute top-0 z-10 flex items-center flex-col justify-center lg-hidden bg-black/65">
        <div className="w-full -mt-6 p-6 text-center">
          <p className="text-4xl font-extrabold text-blue-800">Welcome Back!</p>
          <p className=" z-20 text-slate-300 text-lg px-6 mt-4">
            Sign up or Log in to your account and start purchasing airtime at
            cheaper rate
          </p>
        </div>
        <div className="flex items-center justify-center  absolute bottom-14 w-full">
          <Link
            href="/sign-in"
            className="text-xl text-bold text-slate-100 hover:bg-blue-950 hover:text-slate-100 p-6 rounded-tr-4xl w-full text-center"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="text-xl text-bold text-slate-100 hover:bg-blue-950 hover:text-slate-100 p-6 rounded-tl-4xl w-full text-center"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
