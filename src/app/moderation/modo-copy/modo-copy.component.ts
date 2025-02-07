import { Component } from '@angular/core';
import { HistoryMyGameInterface } from 'src/app/-interface/history-my-game.interface';
import { HistoryMyPlatformInterface } from 'src/app/-interface/history-my-platform.interface';
import { ModerationService } from 'src/app/-service/moderation.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-modo-copy',
  templateUrl: './modo-copy.component.html',
  styleUrls: ['./modo-copy.component.css']
})
export class ModoCopyComponent {
  hmgRandom1: HistoryMyGameInterface | undefined;
  hmgRandom2: HistoryMyGameInterface | undefined;

  hmpRandom1: HistoryMyPlatformInterface | undefined;
  hmpRandom2: HistoryMyPlatformInterface | undefined;
  
  displayHmg: boolean | undefined;
  displayHmp: boolean | undefined;

    constructor(protected app:AppComponent,
                private moderationService:ModerationService) { }
  
  
    ngOnInit(): void {
      this.displayHmg = true;
      this.displayHmp = false;
      this.getRandomHmg();
    }
  
    getRandomHmg(){
  
      this.moderationService.getHmgRandom(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string,result:HistoryMyGameInterface, result2:HistoryMyGameInterface}) => {
        if (response.message === "good"){
          this.hmgRandom1 = response.result;
          this.hmgRandom2 = response.result2;
        }
      });
  
    }

    getRandomHmp(){
  
      this.moderationService.getHmpRandom(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string,result:HistoryMyPlatformInterface, result2:HistoryMyPlatformInterface}) => {
        if (response.message === "good"){
          this.hmpRandom1 = response.result;
          this.hmpRandom2 = response.result2;
        }
      });
  
    }

    toggleManage(){
      if(this.displayHmg == true){
        this.displayHmg = false;
        this.displayHmp = true
      } else if(this.displayHmp == true){
        this.displayHmp = false;
        this.displayHmg = true
      }
    }
}
