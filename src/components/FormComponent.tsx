'use client';
import { useSession } from "next-auth/react";
import * as z from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { FaEnvelope, FaWrench } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";
import CustomInput from "@/components/ui/CustomInput";
import { skillFormSchema, opportunityCategoryFormSchema } from '@/schemas/volunteerFormSchema';
import { FaPhoneAlt } from "react-icons/fa"
import { MdKeyboardAlt } from "react-icons/md";
import { FaCommentDots } from "react-icons/fa"
import CustomInputWithIcon from './ui/InputWithIcon';
import { opportunityCategories, skills } from './../helpers/formConfig';
import LocationDetails from "./Location";
import { Location } from "@/models/Volunteer";

interface FormComponentProps {
    formType: 'volunteer' | 'organization';
}

const FormComponent: React.FC<FormComponentProps> = ({ formType }) => {

    const router = useRouter();

    const [location, setLocation] = useState<Location | undefined>(undefined);

    const schema = formType === 'volunteer' ? skillFormSchema : opportunityCategoryFormSchema;
    type FormValues = z.infer<typeof schema>;

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) });
    const [file, setFile] = useState<File | null>(null);

    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            let requestData
            if (formType === 'volunteer') {
                const formData = new FormData();
                if (file) formData.append('file', file);

                const imageResponse = await axios.post('/api/upload', formData);
                const imageUrl = imageResponse.data.results.url;

                const skillApiResponse = await axios.post<ApiResponse>('/api/skills', data);
                const skillId = skillApiResponse.data.data._id;

                requestData = {
                    ...data,
                    location,
                    role: 'Volunteer',
                    skills: skillId,
                    images: imageUrl,
                };
            } else {
                const formData = new FormData();
                if (file) formData.append('file', file);

                const imageResponse = await axios.post('/api/upload', formData);
                const imageUrl = imageResponse.data.results.url;

                const categoryApiResponse = await axios.post<ApiResponse>('/api/opportunity-category', data);
                const categoryId = categoryApiResponse.data.data._id;

                requestData = {
                    ...data,
                    location,
                    role: 'Organization',
                    category: categoryId,
                    images: imageUrl,
                };
            }

            const response = await axios.post<ApiResponse>('/api/volunteer-form', requestData);
            console.log(response);
            setIsSubmitting(false);
            toast.success("Post added successfully");
            router.replace("/")
        } catch (error) {
            console.error("Error in adding post");
            const axiosError = error as AxiosError<ApiResponse>;
            const errorMessage = axiosError.response?.data.message ?? 'There was a problem with your post. Please try again.';
            toast.error(errorMessage);
            setIsSubmitting(false);
        }
    };
   
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
                <input type="file" onChange={(e) => {
                    const selectedFile = e.target.files?.[0];
                    if (selectedFile) {
                        setFile(selectedFile);
                    }
                }} />
            </div>
        </>
    );

    const volunteerFields = (
        <>
            {commonFields}
            <label htmlFor="skills" className="bg-light w-[60%]">Select skills:</label>
            <select id="skills" className="w-[100%] px-3 py-2 bglight" onChange={(e) => setValue('skillName', e.target.value)}>
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
            <select className='w-[100%] px-3 py-2 bglight' onChange={(e) => setValue('categoryName', e.target.value)}>
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
                <button type="submit" className='bg-black text-white py-1' disabled={isSubmitting}>Add Post</button>
            </form>
            <LocationDetails location={location} setLocation={setLocation} />
            
        </>
    );
};

export default FormComponent;

