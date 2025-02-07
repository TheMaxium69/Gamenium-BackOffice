import { Component } from '@angular/core';
import { HistoryMyGameInterface } from 'src/app/-interface/history-my-game.interface';
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
  
  constructor(protected app:AppComponent,
              private moderationService:ModerationService) { }
  
  
  ngOnInit(): void {
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

}
