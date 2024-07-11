'use client'
import { verifySchema } from '@/schemas/verifySchema'
import { useRouter, useParams } from 'next/navigation'
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState } from "react"
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { FaUserSecret } from "react-icons/fa";

const VerifyAccount = () => {

  const router = useRouter()
  const params = useParams<{ username: string }>()

  type verifyFormValues = z.infer<typeof verifySchema>;
  const { register, handleSubmit, formState: { errors } } = useForm<verifyFormValues>({ resolver: zodResolver(verifySchema) })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Submit function
  const onSubmit: SubmitHandler<verifyFormValues> = async (data: verifyFormValues) => {
    console.log(data)
    setIsSubmitting(true)
    try {
      const response = await axios.post<ApiResponse>('/api/verify-code', {
        
        username: params.username,
        code: data.code
      });
      toast.success(response.data.message);
      router.replace("/sign-in")
      setIsSubmitting(false)
    } catch (error) {
      console.error("Error in verifying")
      const axiosError = error as AxiosError<ApiResponse>;
      let errorMessage = axiosError.response?.data.message ?? ('There was a problem with verification. Please try again.');
      toast.error(errorMessage)
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4 w-[95%] lg:w-[90%]">

        <div>
          <div className="flex bg-[#F0F8FF] w-[100%] p-2 gap-4 items-center">

            <div className="text-xl" >
            <FaUserSecret />
            </div>

            <input
              {...register("code")}
              className="bg-[#F0F8FF] w-[100%] text-lg"
              type="text" id="username" name="code"
              placeholder="Verificaiton Code" 
            />

          </div>
          <p >{errors.code?.message}</p>
        </div>

        
        <button type="submit" className="bg-[#4361ee] text-white text-xl p-3 my-2" disabled={isSubmitting}>Verify</button>
      </form>
    </div>
  )
}

export default VerifyAccount