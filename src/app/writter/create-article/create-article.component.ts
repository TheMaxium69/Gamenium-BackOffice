import { Component } from '@angular/core';
import { ActualityService } from 'src/app/-service/actuality.service';
import { GameService } from 'src/app/-service/game.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {

title: string = "";
content: string = "";
picture_id: number = 0;
game_id: number = 0;

gameSearch: string = "";
gameResults: any[] = [];



  constructor(
    protected app:AppComponent,
    private actualityService:ActualityService,
    private gameService:GameService
  ) {

  }

  submitArticle(){

    const url = this.app.setURL();
    const option = this.app.createCorsToken();
    const body = {
      title:this.title,
      content:this.content,
      picture_id:this.picture_id,
      game_id:this.game_id,
      created_at:new Date(),
      last_edit: "oui",
      nb_edit: 1,
    }

    this.actualityService.createPostActu(body, url, option).subscribe(response => {
      console.log("Article créer", response)
    } )
  }

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
  }
}
