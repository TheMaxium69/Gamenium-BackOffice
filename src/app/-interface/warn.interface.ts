import { CommentReplyInterface } from "./comment-reply.interface"
import { CommentInterface } from "./comment.interface"
import { HistoryMyGameInterface } from "./history-my-game.interface"
import { HistoryMyPlatformInterface } from "./history-my-platform.interface"
import { PostActuInterface } from "./post-actu.interface"
import { UserInterface } from "./user.interface"
import { WarnTypeInterface } from "./warn-type.interface"

export interface WarnInterface
{
    id: number,
    warnType:WarnTypeInterface,
    user: UserInterface | null,
    warnAt: Date,
    content: string | null,
    profil:UserInterface | null,
    actu: PostActuInterface | null,
    comment: CommentInterface | null,
    commentReply: CommentReplyInterface | null,
    hmg: HistoryMyGameInterface | null,
    hmp: HistoryMyPlatformInterface | null,
    is_manage: boolean,
    moderated_by: UserInterface | null,

}
