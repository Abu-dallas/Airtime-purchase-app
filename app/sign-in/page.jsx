"use client";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { loginValidate } from "@/constants/formikValidaton";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loader from "@/components/Loader";

function SignIn() {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: loginValidate,
    onSubmit,
  });

  async function onSubmit(values) {
    setLoading(true);
    try {
      const login = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (login.ok) {
        setLoading(false);
        toast.success("Logged In");
        router.push("/profile");
      }
      if (!login.ok) {
        setLoading(false);
        toast.error("Incorrect email or password");
      }
    } catch (error) {
      console.log("[Front_Login_error]", error);
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-full max-md:bg-[url('/bg2.jpg')]  relative">
      <div className="h-screen w-full relative top-0  bg-slate-950/65">
        <div className="w-full h-screen relative md:flex md:items-center md:justify-center">
          <div className="w-full h-[75vh] md:h-[500px] md:w-[30%] bg-slate-50 md:rounded-xl rounded-t-4xl absolute bottom-0 md:flex md:mb-18 md:justify-center md:flex-col">
            <p className="text-center text-3xl font-bold text-blue-800 mb-3 md:mb-0 mt-16 md:mt-8">
              Welcome Back
            </p>
            <form
              onSubmit={formik.handleSubmit}
              className="w-full items-center  gap-3 mt-12 md:mt-6 justify-center flex px-8 flex-col"
            >
              <div className="w-full">
                <label className="text-md my-3 text-slate-500">
                  Email Address
                </label>
                <input
                  type="text"
                  className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-2 border-slate-300 w-full"
                  placeholder="please enter your email address"
                  {...formik.getFieldProps("email")}
                />
                {formik.errors.email && formik.touched.email ? (
                  <span className="text-sm py-1 text-rose-600">
                    {formik.errors.email}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full">
                <label className="text-md my-3 text-slate-500">Password</label>
                <input
                  type="password"
                  className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-2 border-slate-300 w-full"
                  placeholder="please enter your password"
                  {...formik.getFieldProps("password")}
                />
                {formik.errors.password && formik.touched.password ? (
                  <span className="text-sm py-1 text-rose-600">
                    {formik.errors.password}
                  </span>
                ) : (
                  ""
                )}
              </div>

              <div className="w-full">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center hover:bg-blue-950 bg-blue-800 text-slate-100 p-2.5 mt-3 rounded-2xl"
                >
                  {Loading ? <Loader /> : "Log In"}
                </button>
              </div>
              <div className="flex items-center w-full justify-center gap-2 p-4">
                <hr className="text-slate-300 h-1 w-full" />
                <p className="text-sm w-full text-center text-slate-400">
                  Sign up with
                </p>
                <hr className="text-slate-300 h-1 w-full" />
              </div>
              <div className="flex items-center justify-center w-full gap-6">
                <Image
                  src="/facebook.png"
                  alt="facebook logo"
                  width={2000}
                  height={2000}
                  className="w-7 h-7"
                />
                <Image
                  src="/twitter.png"
                  alt="facebook logo"
                  width={2000}
                  height={2000}
                  className="w-7 h-7"
                />
                <Image
                  src="/google.png"
                  alt="facebook logo"
                  width={2000}
                  height={2000}
                  className="w-7 h-7"
                />
                <Image
                  src="/apple.png"
                  alt="facebook logo"
                  width={2000}
                  height={2000}
                  className="w-7 h-7"
                />
              </div>
              <p className="text-center text-slate-500 py-2 text-md">
                Don't have an account?{" "}
                <Link href="/sign-up" className="text-blue-800 underline ">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
