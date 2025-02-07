import { Component } from '@angular/core';
import { HistoryMyPlatformInterface } from 'src/app/-interface/history-my-platform.interface';
import { ModerationService } from 'src/app/-service/moderation.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-modo-copy-platform',
  templateUrl: './modo-copy-platform.component.html',
  styleUrls: ['./modo-copy-platform.component.css']
})
export class ModoCopyPlatformComponent {
  hmpRandom1: HistoryMyPlatformInterface | undefined;
  hmpRandom2: HistoryMyPlatformInterface | undefined;
    
  constructor(protected app:AppComponent,
              private moderationService:ModerationService) { }
    
    
  ngOnInit(): void {
    this.getRandomHmp();
  }
  
  
  getRandomHmp(){

    this.moderationService.getHmpRandom(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string,result:HistoryMyPlatformInterface, result2:HistoryMyPlatformInterface}) => {
      if (response.message === "good"){
        this.hmpRandom1 = response.result;
        this.hmpRandom2 = response.result2;
      }
    });

  }
}
