import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getPostComments(id: string) {
    const data = await axios.get(`${BASE_URL}/posts/${id}/comments`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}


export async function createComments(id: string , formData : FormData ) {
    const data = await axios.post(`${BASE_URL}/posts/${id}/comments`, formData , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function updateComments(id: string, commentId: string , formData : FormData ) {
    const data = await axios.put(`${BASE_URL}/posts/${id}/comments/${commentId}`, formData , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function deleteComments(id: string, commentId: string ) {
    const data = await axios.delete(`${BASE_URL}/posts/${id}/comments/${commentId}` , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}