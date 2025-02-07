import {Component, OnInit} from '@angular/core';
import {PostActuInterface} from "../../-interface/postActu.interface";
import {AppComponent} from "../../app.component";
import {ModerationService} from "../../-service/moderation.service";
import {UserInterface} from "../../-interface/user.interface";

@Component({
  selector: 'app-modo-profil',
  templateUrl: './modo-profil.component.html',
  styleUrls: ['./modo-profil.component.css']
})
export class ModoProfilComponent  implements OnInit{

  profilRandom1: UserInterface | undefined;
  profilRandom2: UserInterface | undefined;

  constructor(protected app:AppComponent,
              private moderationService:ModerationService) { }


  ngOnInit(): void {
    this.getRandom();
  }

  getRandom(){

    this.moderationService.getProfilRandom(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string,result:UserInterface, result2:UserInterface}) => {
      if (response.message === "good"){
        this.profilRandom1 = response.result;
        this.profilRandom2 = response.result2;
      }
    });

  }



}

