import { PostActuInterface } from "./post-actu.interface";
import {UserInterface} from "./user.interface";

export interface LogActuInterface {
  id:number,
  user:UserInterface,
  actu:PostActuInterface,
  action:string,
  route:string,
  created_at:Date,
}
