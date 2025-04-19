"use client";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import { registerValidation } from "@/constants/formikValidaton";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

function SignUp() {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      cpassword: "",
    },
    validate: registerValidation,
    onSubmit,
  });

  async function onSubmit(values) {
    console.log("values:", values);
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success("Registration is successful");
        router.push("/sign-in");
      }
    } catch (error) {
      setLoading(false);
      console.log("[Register_Frond_error]", error);
      toast.error("Register failed, please try again letter");
    }
  }
  return (
    <div className="h-screen w-full max-md:bg-[url('/bg2.jpg')]  relative">
      <div className="h-screen w-full relative top-0  bg-slate-950/65">
        <div className="w-full h-screen relative md:flex md:items-center md:justify-center">
          <div className="md:hidden h-[90vh] w-full md:h-screen md:w-[35%] bg-slate-50 rounded-t-4xl absolute bottom-0">
            <p className="text-center text-3xl font-bold text-blue-800 mb-3 mt-8">
              Get Started
            </p>
            <form
              onSubmit={formik.handleSubmit}
              className="w-full items-center  gap-3 mt-8 justify-center flex px-8 flex-col"
            >
              <div className="w-full ">
                <label className="text-md my-3 text-slate-500">Full Name</label>
                <input
                  type="text"
                  className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-2 border-slate-300 w-full"
                  placeholder="please enter your name"
                  {...formik.getFieldProps("name")}
                />
                {formik.errors.name && formik.touched.name ? (
                  <span className="text-sm py-1 text-rose-600">
                    {formik.errors.name}
                  </span>
                ) : (
                  ""
                )}
              </div>
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
                <label className="text-md my-3 text-slate-500">
                  Phone Number
                </label>
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
                <label className="text-md my-3 text-slate-500">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-2 border-slate-300 w-full"
                  placeholder="please confirm your password"
                  {...formik.getFieldProps("cpassword")}
                />
                {formik.errors.cpassword && formik.touched.cpassword ? (
                  <span className="text-sm py-1 text-rose-600">
                    {formik.errors.cpassword}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="w-full">
                <button
                  type="submit"
                  className="w-full text- hover:bg-blue-950 bg-blue-800 text-slate-100 p-2.5 mt-3 rounded-2xl"
                >
                  {Loading ? <Loader /> : "Sign Up"}
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
                Already have an account?{" "}
                <Link href="/sign-in" className="text-blue-800 underline ">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
          <div className="max-md:hidden  flex w-full h-screen items-center justify-center">
            <div className="w-[70%] max-lg:w-[80%] py-6 h-screen flex">
              <div className="bg-blue-800 w-full h-[550px] rounded-bl-2xl rounded-tl-2xl flex items-center justify-center">
                <p className="text-center text-3xl font-bold text-white">
                  Get Started
                </p>
              </div>
              <div className="bg-white rounded-br-2xl rounded-tr-2xl flex items-center max-h-[550px] justify-center w-full">
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full items-center  gap-3 mt-4 justify-center flex px-6 py-4 flex-col"
                >
                  <div className="w-full ">
                    <label className="text-md my-3 text-slate-500">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-1 border-slate-300 w-full"
                      placeholder="please enter your name"
                      {...formik.getFieldProps("name")}
                    />
                    {formik.errors.name && formik.touched.name ? (
                      <span className="text-sm py-1 text-rose-600">
                        {formik.errors.name}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-full">
                    <label className="text-md my-3 text-slate-500">
                      Email Address
                    </label>
                    <input
                      type="text"
                      className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-1 border-slate-300 w-full"
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
                    <label className="text-md my-3 text-slate-500">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-1 border-slate-300 w-full"
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
                    <label className="text-md my-3 text-slate-500">
                      Password
                    </label>
                    <input
                      type="password"
                      className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-1 border-slate-300 w-full"
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
                    <label className="text-md my-3 text-slate-500">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      className="text-slate-700 placeholder:text-slate-300  outline-none border-1 rounded-xl p-1 border-slate-300 w-full"
                      placeholder="please confirm your password"
                      {...formik.getFieldProps("cpassword")}
                    />
                    {formik.errors.cpassword && formik.touched.cpassword ? (
                      <span className="text-sm py-1 text-rose-600">
                        {formik.errors.cpassword}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="w-full">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center hover:bg-blue-950 bg-blue-800 text-slate-100 p-1.5 mt-1.5 rounded-2xl"
                    >
                      {Loading ? <Loader /> : "Sign Up"}
                    </button>
                  </div>
                  <div className="flex items-center w-full justify-center gap-2 p-2">
                    <hr className="text-slate-300 h-1 w-full" />
                    <p className="text-sm w-full text-center text-slate-400">
                      Sign up with
                    </p>
                    <hr className="text-slate-300 h-1 w-full" />
                  </div>
                  <div className="flex items-center justify-center  -mt-2 w-full gap-6">
                    <Image
                      src="/facebook.png"
                      alt="facebook logo"
                      width={2000}
                      height={2000}
                      className="w-6 h-6"
                    />
                    <Image
                      src="/twitter.png"
                      alt="facebook logo"
                      width={2000}
                      height={2000}
                      className="w-6 h-6"
                    />
                    <Image
                      src="/google.png"
                      alt="facebook logo"
                      width={2000}
                      height={2000}
                      className="w-6 h-6"
                    />
                    <Image
                      src="/apple.png"
                      alt="facebook logo"
                      width={2000}
                      height={2000}
                      className="w-6 h-6"
                    />
                  </div>
                  <p className="text-center text-slate-500 py-1 text-md">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-blue-800 underline ">
                      Sign In
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
