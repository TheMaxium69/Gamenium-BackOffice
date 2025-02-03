import {PlateformInterface} from "./plateform.interface";
import { UserInterface } from "./user.interface";

export interface myPlatformInterface {

  id:number|undefined,
  user:UserInterface,
  plateform:PlateformInterface,
  added_at:Date

}
