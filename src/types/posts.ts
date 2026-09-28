import type { PostCardI } from "./postCard"

export interface postI {
    data: PostCardI[],
    message: string,
    success: boolean,
    meta: {
        pagination: {
            currentPage: number,
            numberOfPages: number,
            limit: number,
            nextPage: number,
            total: number
        }
    }
}