import {Component, ElementRef, ViewChild} from '@angular/core';
import {ProviderInterface} from "../../-interface/provider.interface";
import {AppComponent} from "../../app.component";
import {ActualityService} from "../../-service/actuality.service";
import {GameService} from "../../-service/game.service";
import {ProviderService} from "../../-service/provider.service";
import {UploadService} from "../../-service/upload.service";
import {TestService} from "../../-service/test.service";
import {ApicallInterface} from "../../-interface/apicall.interface";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  note: number = 0;
  content: string = "";
  game_id: number = 0;

  gameSearch: string = "";
  gameResults: any[] = [];

  constructor(
    protected app:AppComponent,
    private gameService:GameService,
    private testService:TestService,
  ) {

  }


  submitTest(){
    const url = this.app.setURL();
    const option = this.app.createCorsToken();
    let body:any = {
      note:this.note,
      content:this.content,
      game_id:this.game_id
    }

    this.testService.createTest(body, url, option).subscribe((test:ApicallInterface) => {

      console.log(test)


    })



  }


  // Recherche de jeux
  searchGames() {
    if (this.gameSearch.length > 2) { // Démarre recherche après 3 caractère
      const url = this.app.setURL();
      const option = this.app.createCorsToken();
      const body = {
        searchValue: this.gameSearch,
        limit: 10
      };

      this.gameService.searchGames(body, url, option).subscribe(response => {
        this.gameResults = response;
      });
    }
  }

  selectGame(game: any) {
    this.game_id = game.id;
    this.gameSearch = game.name; // montre le nom du jeux
    this.gameResults = []; // cache la liste apres
  }
}
