'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { FaImagePortrait } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";
import CustomInput from "@/components/ui/CustomInput";



const SignIn = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  // React hook form with zod
  type SignInFormValues = z.infer<typeof signInSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues>({ resolver: zodResolver(signInSchema) })

  // Submit function
  const onSubmit: SubmitHandler<SignInFormValues> = async (data: SignInFormValues) => {
    console.log(data)
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    console.log(result)
    if (result?.error) {
      toast.error("Login failed, Incorrect username or password")
    }
    if (result?.url) {
      router.replace("/")
    }

  }

  return (
    <div>
      <div className="  flex flex-col items-start gap-2  ">
        <h1 className="text-[#4361ee] text-3xl font-semibold md:text-blac lg:text-red">Sign In</h1>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-[95%] lg:w-[90%]">

        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">

            <div className="text-xl" >
              <FaImagePortrait />
            </div>

            <CustomInput
              register={register("identifier")}
              placeholder="Email/Username"
            />
          </div>
          {errors.identifier &&
            <p >{errors.identifier?.message}</p>
          }

        </div>


        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">

            <div className="text-xl" >
              <FaRegKeyboard />
            </div>

            <CustomInput
              register={register("password")} type="password"
              placeholder=" Password"
            />
          </div>
          {errors.password &&
            <p >{errors.password?.message}</p>
          }
        </div>

        <button type="submit" className="bg-[#4361ee] text-white text-xl p-3 my-2" disabled={isSubmitting}>Sign In</button>
      </form>

      <div className="flex gap-5">
        <p>Already a user?</p>
        <Link href="/sign-in" className="text-[#4361ee] font-semibold ">
          Sign in
        </Link>
      </div>


    </div>
  )

}

export default SignIn