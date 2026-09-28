import type { postCommentI } from "./postComment"

export interface notificationI {
  _id: string
  recipient: Recipient
  actor: Actor
  type: string
  entityType: string
  entityId: string
  isRead: boolean
  createdAt: string
  entity: Entity
}

export interface Recipient {
  _id: string
  name: string
  photo: string
}

export interface Actor {
  _id: string
  name: string
  photo: string
}

export interface Entity {
  _id: string
  body: string
  user: string
  commentsCount: number
  topComment: postCommentI[]
  sharesCount: number
  likesCount: number
  isShare: boolean
  id: string
}
