import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PostActuInterface} from "../../-interface/post-actu.interface";
import {AppComponent} from "../../app.component";
import {ActualityService} from "../../-service/actuality.service";
import {ViewService} from "../../-service/view.service";
import {ApicallInterface} from "../../-interface/apicall.interface";
import {GameInterface} from "../../-interface/game.interface";
import {GameService} from "../../-service/game.service";

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css']
})
export class GamePreviewComponent  implements OnInit, OnChanges {

  @Input({transform: numberAttribute})
  public id: number | null = null;

  gameSelected: GameInterface | undefined;
  viewGame: number = 0;

  constructor(
    protected app: AppComponent,
    private gameServcice: GameService,
    private viewService: ViewService,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.id = changes['id'].currentValue;
      if (this.id) {
        this.getGame(this.id);
      }
    }
  }

  getGame(id: number) {
    this.gameServcice.getGame(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
      if (response.message === 'good') {
        this.gameSelected = response.result;
      }
    })

    this.viewService.getGameViews(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
      if (response.message === 'good') {
        this.viewGame = response.result;
      }
    })

  }
}
