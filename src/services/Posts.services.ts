import axios from "axios"


const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function getSinglePost(id: string) {
    const data = await axios.get(`${BASE_URL}/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}


export async function createPost(formData : FormData) {
    const data = await axios.post(`${BASE_URL}/posts`, formData , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function updatePost(id : string, formData : FormData) {
    const data = await axios.put(`${BASE_URL}/posts/${id}`, formData , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function deletePost(id : string) {
    const data = await axios.delete(`${BASE_URL}/posts/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function likeAndUnlike(id : string) {
    const data = await axios.put(`${BASE_URL}/posts/${id}/like`, null , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}


export async function getUserPosts(id : string) {
    const data = await axios.get(`${BASE_URL}/users/${id}/posts`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}