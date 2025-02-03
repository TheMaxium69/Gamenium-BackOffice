import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameInterface } from 'src/app/-interface/game.interface';
import { PostActuInterface } from 'src/app/-interface/post-actu.interface';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { ActualityService } from 'src/app/-service/actuality.service';
import { GameService } from 'src/app/-service/game.service';
import { ProviderService } from 'src/app/-service/provider.service';
import { SelectedArticleService } from 'src/app/-service/selected-article.service';
import { UploadService } from 'src/app/-service/upload.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  
  selectedArticle: PostActuInterface | null = null;

  gameSearch: string = '';
  gameResults: any[] = [];

  providerSearch: string = '';
  providerResults: any[] = [];

  displaySelectMessage: boolean = false;

  @ViewChild('fileInput') fileInput!: ElementRef; 

  constructor(
    private route: ActivatedRoute,
    private actualityService: ActualityService,
    private gameService: GameService,
    private providerService: ProviderService,
    private uploadService: UploadService,
    private selectedArticleService: SelectedArticleService,
    protected app: AppComponent
  ) {}

  ngOnInit() {
    console.log(this.selectedArticle);
    console.log(this.displaySelectMessage);
    this.selectedArticle = this.selectedArticleService.getSelectedArticle();
    console.log(this.selectedArticle);
    console.log(this.displaySelectMessage);
    
  
    if (!this.selectedArticle) {
      this.displaySelectMessage = true;
    } else {
      this.displaySelectMessage = false;
    }
  }
  
  
  loadSelectedArticle(article: PostActuInterface) {
    this.displaySelectMessage = false;
    this.selectedArticle = article;
  }
  
  

  /* Charger un article en fonction de son ID */
  fetchArticle(id: number) {
    const url = this.app.setURL();
    const option = this.app.createCorsToken();
    
    this.actualityService.getPostActu(url, id, option).subscribe(response => {
      this.selectedArticle = response.result;
    });
  }

  /* Sélectionner un article sans rechargement */
  onArticleSelected(article: PostActuInterface) {
    this.selectedArticle = article;
  }

  /* Recherche de jeux */
  searchGames() {
    if (this.gameSearch.length > 2) {
      const url = this.app.setURL();
      const option = this.app.createCorsToken();
      this.gameService.searchGames({ searchValue: this.gameSearch, limit: 10 }, url, option).subscribe(response => {
        this.gameResults = response;
      });
    }
  }


/* Sélectionner un jeu */
  selectGame(game: GameInterface) {
    this.selectedArticle!.game = game; // Store full object
    this.gameSearch = game.name; // Update UI
    this.gameResults = []; // Clear dropdown
  }


  /* Recherche de providers */
  searchProviders() {
    if (this.providerSearch.length > 2) {
      const url = this.app.setURL();
      const option = this.app.createCorsToken();
      this.providerService.searchProviders(this.providerSearch, 10, url, option).subscribe(response => {
        this.providerResults = response;
      });
    }
  }


  /* Sélectionner un provider */
selectProvider(provider: ProviderInterface) {
  this.selectedArticle!.Provider = provider; // Store full object
  this.providerSearch = provider.displayName; // Update UI
  this.providerResults = [];
}


  /* Ouvrir le sélecteur de fichier */
  triggerFileSelect() {
    this.fileInput.nativeElement.click();
  }

  /* Gérer la sélection de l'image */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const url = this.app.setURL();
      const option = this.app.createCorsToken();
      this.uploadService.uploadPostActuPhoto(file, url, option).subscribe(response => {
        this.selectedArticle!.picture = response.result; // Mise à jour de l'image
      });
    }
  }

  /* Mettre à jour l'article */
  updateArticle() {
    if (!this.selectedArticle) {
      console.error("Aucun article sélectionné");
      return;
    }

    const url = this.app.setURL();
    const option = this.app.createCorsToken();

    const body = {
      title: this.selectedArticle.title,
      content: this.selectedArticle.content,
      game_id: this.selectedArticle.game?.id, // extrait l'id
      provider_id: this.selectedArticle.Provider?.id, // extrait l'id
      picture_id: this.selectedArticle.picture?.id,
      last_edit: new Date(),
      nb_edit: (this.selectedArticle.nb_edit ?? 0) + 1, // increment
    };
    

    this.actualityService.updatePostActu(this.selectedArticle.id, body, url, option).subscribe(response => {
      console.log("Article mis à jour", response);
    });
  }
}
