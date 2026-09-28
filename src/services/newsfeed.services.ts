import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL

// ================== All posts ====================
export async function getNewsFeed() {
    const data = await axios.get(`${BASE_URL}/posts?limit=20`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

// ================== Suggetion friends =====================
export async function getSuggestedFriends() {
    const data = await axios.get(`${BASE_URL}/users/suggestions?limit=5`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

// ================== Follow and unfollow user ====================
export async function followAndUnfollowUser(id: string) {
    const data = await axios.put(`${BASE_URL}/users/${id}/follow`, null , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}
