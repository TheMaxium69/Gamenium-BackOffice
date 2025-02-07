import {UserInterface} from "./user.interface";
import {PictureInterface} from "./picture.interface";

export interface PostActuInterface {
    id: number,
    title:string,
    content: string,
    picture_id: number,
    picture: PictureInterface
    user_id: number,
    user: UserInterface,
    game_id: number,
    created_at: Date,
}
