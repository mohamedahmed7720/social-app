import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getMyProfile() {
    const data = await axios.get(`${BASE_URL}/users/profile-data`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function getUserProfile(id: string) {
    const data = await axios.get(`${BASE_URL}/users/${id}/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function uploadProfilePhoto(formData: FormData) {
    const data = await axios.put(`${BASE_URL}/users/upload-photo`,formData , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}