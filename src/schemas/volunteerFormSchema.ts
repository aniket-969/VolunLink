import {z} from 'zod'

export const skillFormSchema = z.object({
    title: z.string().min(1), 
    description: z.string().min(10), 
    email: z.string().email({ message: 'Invalid email address' }), 
    phone: z.string().optional(),
    skills: z.string().min(1), 
    skillDescription: z.string().min(10), 
    availableFrom: z.string().date().optional(), 
    availableTill: z.string().date().optional(), 
    images: z.array(z.string()),
})

export const opportunityCategoryFormSchema = z.object({
    title: z.string().min(1), 
    description: z.string().min(10), 
    email: z.string().email({ message: 'Invalid email address' }), 
    phone: z.string(),
    category:z.string().min(1),
    categoryDescription:z.string().min(10),
    availableFrom: z.string().date().optional(), 
    availableTill:z.string().date().optional(), 
    images: z.array(z.string()),
})