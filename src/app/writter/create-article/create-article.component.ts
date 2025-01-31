import { Component } from '@angular/core';
import { ActualityService } from 'src/app/-service/actuality.service';
import { GameService } from 'src/app/-service/game.service';
import { ProviderService } from 'src/app/-service/provider.service';
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
provider_id?: number;

gameSearch: string = "";
gameResults: any[] = [];

providerSearch: string = "";
providerResults: any[] = [];



  constructor(
    protected app:AppComponent,
    private actualityService:ActualityService,
    private gameService:GameService,
    private providerService: ProviderService
  ) {

  }
    //Recherche Provider

    searchProviders() {
      if (this.providerSearch.length > 2) { 
        const url = this.app.setURL();
        const option = this.app.createCorsToken();
    
        this.providerService.searchProviders(this.providerSearch, 10, url, option)
          .subscribe(response => {
            console.log("Provider search response:", response); 
            if (response.message === "good" && response.result) {
              this.providerResults = response.result; 
            } else {
              this.providerResults = []; 
            }
          }, error => {
            console.error("Error fetching providers:", error);
            this.providerResults = []; 
          });
      }
    }
    

  selectProvider(provider: any) {
    this.provider_id = provider.id;
    this.providerSearch = provider.displayName; 
  }

  submitArticle(){

    const url = this.app.setURL();
    const option = this.app.createCorsToken();
    let body:any = {
      title:this.title,
      content:this.content,
      picture_id:this.picture_id,
      game_id:this.game_id,
      created_at:new Date(),
      last_edit: "oui",
      nb_edit: 1,
    }

    if (this.provider_id) {
      body.provider_id = this.provider_id;
    }

    this.actualityService.createPostActu(body, url, option).subscribe(response => {
      console.log("Article créer", response)
    } )
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
  }
}
