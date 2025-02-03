import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HistoryMyPlatformInterface } from 'src/app/-interface/history-my-platform.interface';
import { HistoryMyPlatformService } from 'src/app/-service/history-my-platform.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-hmp-preview',
  templateUrl: './hmp-preview.component.html',
  styleUrls: ['./hmp-preview.component.css']
})
export class HmpPreviewComponent implements OnInit, OnChanges{
MyPlatform : HistoryMyPlatformInterface | undefined;

  @Input({transform: numberAttribute})
  public id: number|null = null;


  constructor(
    private historyMyPlatformService: HistoryMyPlatformService,
    protected app: AppComponent
  ){}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['id']) {
        this.id = changes['id'].currentValue;
        if (this.id) {
          this.getMyHmp(this.id);
        }
      }
    }

  getMyHmp(idMyPlatform:number){
    this.historyMyPlatformService.getOneMyHmpById(idMyPlatform, this.app.setURL(), this.app.createCorsToken()).subscribe((responseMyPlatform : { message: string; result:HistoryMyPlatformInterface | undefined ;}) => {
      if(responseMyPlatform.message === "good"){
        this.MyPlatform = responseMyPlatform.result;
        console.log(this.MyPlatform);
      } else {
        console.log('echec récupération hmg : ' + responseMyPlatform.message);
      }
    })
  }
}
