import axios from "axios";
import type { LoginSchemaType, RegisterSchemaType } from "../lib/schema/auth.schema";


const BASE_URL = import.meta.env.VITE_API_BASE_URL


export async function registerUser(formData: RegisterSchemaType) {
    const data = await axios.post(`${BASE_URL}/users/signup` , formData)
    return data
}

export async function loginUser(formData: LoginSchemaType) {
    const data = await axios.post(`${BASE_URL}/users/signin` , formData)
    return data
}