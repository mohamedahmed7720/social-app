import type { ParentComment } from "./postCard"

export interface postCommentI {
  _id: string
  content: string
  commentCreator: CommentCreator
  post: string
  parentComment: ParentComment
  likes: string[]
  createdAt: string
  repliesCount: number
}

export interface CommentCreator {
  _id: string
  name: string
  username: string
  photo: string
}
