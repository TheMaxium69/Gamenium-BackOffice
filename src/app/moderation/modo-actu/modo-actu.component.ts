import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";
import {PostActuInterface} from "../../-interface/postActu.interface";
import {ModerationService} from "../../-service/moderation.service";

@Component({
  selector: 'app-modo-actu',
  templateUrl: './modo-actu.component.html',
  styleUrls: ['./modo-actu.component.css']
})
export class ModoActuComponent implements OnInit{

  actuRandom1: PostActuInterface | undefined;
  actuRandom2: PostActuInterface | undefined;

  constructor(protected app:AppComponent,
              private moderationService:ModerationService) { }


  ngOnInit(): void {
    this.getRandom();
  }

  getRandom(){

    this.moderationService.getActuRandom(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string,result:PostActuInterface, result2:PostActuInterface}) => {
      if (response.message === "good"){
        this.actuRandom1 = response.result;
        this.actuRandom2 = response.result2;
      }
    });

  }



}
