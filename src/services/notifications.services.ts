import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_BASE_URL


export async function getNotifications() {
    const data = await axios.get(`${BASE_URL}/notifications?unread=false&page=1&limit=10`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function markNotificationAsRead(id: string) {
    const data = await axios.patch(`${BASE_URL}/notifications/${id}/read`,null , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}

export async function getUnreadCount() {
    const data = await axios.get(`${BASE_URL}/notifications/unread-count` , {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Usertoken")}`
        }
    })
    return data
}