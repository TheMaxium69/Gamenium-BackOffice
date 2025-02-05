import {PictureInterface} from "./picture.interface";

export interface UserInterface {
  id:number,
  username:string,
  email:string,
  displayname:string,
  displaynameUseritium:string,
  displayname_useritium:string|undefined,
  joinAt:Date,
  userRole:string[]
  pp: PictureInterface|undefined,
  themeColor: string;
  color: string;
  roles:string[],
  providerGestionId:number|null,
  badges:{id:number,name:string,pictureUrl:string}[]|null,
}
