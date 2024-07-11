'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { FaEnvelope, FaWrench } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";
import CustomInput from "@/components/CustomInput";
import { skillFormSchema, opportunityCategoryFormSchema } from '@/schemas/volunteerFormSchema';
import { FaPhoneAlt } from "react-icons/fa"
import { MdKeyboardAlt } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa"
import CustomInputWithIcon from './InputWithIcon';
import { opportunityCategories, skills } from './../helpers/formConfig';

interface FormComponentProps {
    formType: 'volunteer' | 'organization';
}

const FormComponent: React.FC<FormComponentProps> = ({ formType }) => {

    const schema = formType === 'volunteer' ? skillFormSchema : opportunityCategoryFormSchema;
    type FormValues = z.infer<typeof schema>;

    const { register, handleSubmit,setValue, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<FormValues> = data => {

        console.log(data);
    };

    const router = useRouter();
    const [category, setCategory] = useState("");
    const [skill, setSkills] = useState("");
console.log(errors)

    const commonFields = (
        <>
            <CustomInputWithIcon register={register('title')} placeholder="Title" icon={FaCommentDots} />
            <CustomInputWithIcon register={register('description')} placeholder="Description" icon={MdKeyboardAlt} isTextarea />
            <CustomInputWithIcon register={register('email')} placeholder="Email" icon={FaEnvelope} />
            <CustomInputWithIcon register={register('phone')} placeholder="Phone" icon={FaPhoneAlt} />
            <div className=" flex items-center justify-start gap-2" >

                <label >Available from:</label>
                <CustomInput
                    type="date"
                    className="bglight p-2"
                    register={register("availableFrom")}  
                />
            </div>

            <div className=" flex items-center justify-start gap-6" >

                <label >Available till:</label>
                <CustomInput
                    type="date"
                    className="bglight p-2"
                    register={register("availableTill")}
                   
                />
            </div>

            <div>
                <label>Choose images to upload </label>
                <input type="file" />
            </div>
        </>
    );

    const volunteerFields = (
        <>
            {commonFields}
            <label htmlFor="skills" className="bg-light w-[60%]">Select skills:</label>
            <select id="skills" className="w-[100%] px-3 py-2 bglight" onChange={(e) => setValue('skills',e.target.value)}>
                {skills.map((optGroup, index) => (
                    <optgroup key={index} label={optGroup.label}>
                        {optGroup.options.map((option, index) => (
                            <option key={index} value={option.value}>{option.label}</option>
                        ))}
                    </optgroup>
                ))}
            </select>
            <CustomInputWithIcon icon={FaWrench} register={register('skillDescription')} isTextarea placeholder="Skill Description" />
        </>
    );

    const organizationFields = (
        <>
            {commonFields}
            <label htmlFor="skills" className="bg-light w-[60%]">Opportunity category:</label>
            <select className='w-[100%] px-3 py-2 bglight' onChange={(e) => setValue('category',e.target.value)}>
    {opportunityCategories.map((option, index) => (
      <option key={index} value={option.value}>{option.label}</option>
    ))}
  </select>
            <CustomInputWithIcon icon={FaWrench} register={register('categoryDescription')} isTextarea placeholder="Description" />
        </>
    );

    return (
        <>
        <form onSubmit={handleSubmit(onSubmit)}>
            {formType === 'volunteer' && volunteerFields}
            {formType === 'organization' && organizationFields}
            <button type="submit" className='bg-black text-white py-1' >Add Post</button>
        </form>
        </>
    );
};

export default FormComponent;
