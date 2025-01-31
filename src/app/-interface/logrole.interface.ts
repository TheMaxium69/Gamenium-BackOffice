import {UserInterface} from "./user.interface";

export interface LogRoleInterface {
  id:number,
  user:UserInterface,
  role:string,
  action:string,
  created_at:Date,
  action_by:UserInterface,
}


// {
//   "id": 1,
//   "user": {
//   "id": 1,
//     "displayname_useritium": "Luigi Guyot",
//     "username": "Luigi_Guyot",
//     "displayname": "Luigi_Guyot"
// },
//   "role": "ROLE_ADMIN",
//   "action": "add",
//   "created_at": "2025-01-31T12:28:06+00:00",
//   "action_by": {
//   "id": 2,
//     "displayname_useritium": "Maxime Tournier",
//     "username": "TheMaximeSan",
//     "displayname": "Maxime Tournier"
// }
// }
