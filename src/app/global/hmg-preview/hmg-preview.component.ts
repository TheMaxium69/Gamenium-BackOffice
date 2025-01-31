import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HistoryMyGameInterface } from 'src/app/-interface/history-my-game.interface';
import { HistoryMyGameService } from 'src/app/-service/history-my-game.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-hmg-preview',
  templateUrl: './hmg-preview.component.html',
  styleUrls: ['./hmg-preview.component.css']
})
export class HmgPreviewComponent implements OnInit, OnChanges{

  MyGame : HistoryMyGameInterface | undefined;

  @Input({transform: numberAttribute})
  public id: number|null = null;


  constructor(
    private historyMyGameService: HistoryMyGameService,
    private app: AppComponent
  ){}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['id'] && changes['id']) {
        this.id = changes['id'].currentValue;
        if (this.id) {
          this.getMyHmg(this.id);
        }
      }
    }

  getMyHmg(idMyGame:number){
    this.historyMyGameService.getOneMyGame(idMyGame, this.app.setURL(), this.app.createCorsToken()).subscribe((responseMyGame : { message: string; result:HistoryMyGameInterface | undefined ;}) => {
      if(responseMyGame.message === "good"){
        this.MyGame = responseMyGame.result;
        console.log(this.MyGame);
      } else {
        console.log('echec récupération hmg : ' + responseMyGame.message);
      }
    })
  }
}
