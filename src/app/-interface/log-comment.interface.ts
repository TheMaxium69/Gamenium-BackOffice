import {UserInterface} from "./user.interface";

export interface LogCommentInterface {
   id:number,
   user:UserInterface,
   content:string,
   created_at:Date,
   deleted_at:Date|undefined,
}


/*

{
        "id": 1,
        "user": {
            "id": 2,
            "displayname_useritium": "Maxime Tournier",
            "username": "TheMaximeSan",
            "displayname": "Maxime Tournier",
            "pp": {
                "id": 93,
                "url": "https:\/\/127.0.0.1:8000\/uploads\/userPP_LMOJkUy5nkNNiAYnlRZ4.jpg"
            },
            "color": "#8000ff"
        },
        "content": "azeaz",
        "created_at": "2025-02-08T17:29:55+00:00",
        "deleted_at": "2025-02-08T17:29:57+00:00"
    }

* */
