import * as z from "zod"

export const registerSchema = z.object({
    name: z.string().nonempty("Name is required").min(3 , "Name must be atleast 2 characters").max(15 , "Name must not exceed 15 characters"),
    username: z.string().nonempty("username is required").min(3 , "username must be atleast 2 characters").max(12 , "username must not exceed 12 characters").regex(/^[a-z0-9_]{3,30}$/ , "username must be lowercase and can only contain letters, numbers , and underscores"),
    email: z.email("Email must be a valid one").nonempty("Email is required"),
    dateOfBirth: z.string().nonempty("Date of birth is required").refine((date)=>{
        const currentYear = new Date().getFullYear()
        const birthYear = new Date(date).getFullYear()
        const age = currentYear - birthYear
        return age >= 18
    } , {error: "Age must be above 18."}),
    gender: z.string().nonempty("Gender is required"),
    password: z.string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must include uppercase, lowercase, number, and special character."),
    rePassword: z.string().nonempty("Confirm password is required")
}).refine((date)=> date.password == date.rePassword , {
    path: ["rePassword"],
    error: "rePassword must match with password"
})


export const loginSchema = z.object({
    email: z.email("Email must be a valid one").nonempty("Email is required"),
    password: z.string().nonempty("password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "Password must include uppercase, lowercase, number, and special character.")
})


export type RegisterSchemaType = z.infer<typeof registerSchema>
export type LoginSchemaType = z.infer<typeof loginSchema>
