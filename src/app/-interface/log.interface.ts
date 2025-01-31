import {UserInterface} from "./user.interface";

export interface LogInterface {
  id:number,
  user:UserInterface,
  moderated_by:UserInterface,
  why:string,
  created_at:Date,
}
