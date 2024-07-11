'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { FaEnvelope } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";
import CustomInput from "@/components/CustomInput";

const SignUp = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [debouncedUsername, setDebouncedUsername] = useDebounceValue(username, 400);
  const router = useRouter()

  // React hook form with zod
  type SignUpFormValues = z.infer<typeof signUpSchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormValues>({ resolver: zodResolver(signUpSchema) })

  // Submit function
  const onSubmit: SubmitHandler<SignUpFormValues> = async (data: SignUpFormValues) => {
    console.log(data)
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);
      toast.success("Signed up");

      router.replace(`/verify/${data.username}`)
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error in sign up")
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message ?? ('There was a problem with your sign-up. Please try again.');
      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage('');
        console.log(usernameMessage)
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username?username=${debouncedUsername}`
          );
          console.log("This is response", response)
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  return (
    <div>
      <div className="  flex flex-col items-start gap-2  ">
        <h1 className="text-[#4361ee] text-3xl font-semibold md:text-blac lg:text-red">Sign Up</h1>
        <p className="text-md">Create your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-[95%] lg:w-[90%]">

        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">

            <div className="text-xl" >
              <FaImagePortrait />
            </div>

            <CustomInput
              register={register("username")}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />

          </div>

          {usernameMessage && (
            <p>{usernameMessage}</p>
          )}
        </div>

        <div>

          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">
            <div className="text-xl" >
              <FaEnvelope />
            </div>

            <CustomInput
              register={register("email")}
              type="email"
              placeholder=" Email"
            />
          </div>
          <p >{errors.email?.message}</p>
        </div>

        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">

            <div className="text-xl" >
              <FaRegKeyboard />
            </div>

            <CustomInput
              register={register("password")}
              type="password"
              placeholder=" Password"
            />
          </div>
          {errors.password &&
            <p >{errors.password?.message}</p>
          }
        </div>
        <button type="submit" className="bg-[#4361ee] text-white text-xl p-3 my-2" disabled={isSubmitting}>Sign Up</button>
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

export default SignUp