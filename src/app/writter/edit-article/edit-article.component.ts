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
  imagePreview: string | null = null;
  imageClass: string = '';

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
    // Récupère l'article depuis le service
    this.selectedArticle = this.selectedArticleService.getSelectedArticle();

    if (!this.selectedArticle) {
      this.displaySelectMessage = true;
    } else {
      this.displaySelectMessage = false;

      // Précharger l'image actuelle si disponible
      if (this.selectedArticle.picture?.url) {
        this.imagePreview = this.selectedArticle.picture.url;
      }
    }
  }

  /* Charger un article en fonction de son ID */
  fetchArticle(id: number) {
    const url = this.app.setURL();
    const option = this.app.createCorsToken();

    this.actualityService.getPostActu(url, id, option).subscribe(response => {
        if (response.result) {
            this.selectedArticle = response.result;
            this.imagePreview = this.selectedArticle?.picture?.url ?? null;
        } else {
            this.selectedArticle = null;
            this.imagePreview = null; 
        }
    }, error => {
        console.error("Erreur lors de la récupération de l'article :", error);
    });

}


  /* Ouvrir le sélecteur de fichier */
  triggerFileSelect() {
    this.fileInput.nativeElement.click();
  }

  /* Gérer la sélection de l'image */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;

        // Vérifier les dimensions de l'image
        const img = new Image();
        img.src = this.imagePreview;
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          this.imageClass = '';

          // Appliquer la bonne classe CSS
          if (aspectRatio > 1.3) {
            this.imageClass = 'horizontal';
          } else if (aspectRatio >= 0.8 && aspectRatio <= 1.3) {
            this.imageClass = 'square';
          } else {
            this.imageClass = 'icon';
          }
        };

        // Ensuite, uploader l'image
        this.uploadImage(file);
      };

      reader.readAsDataURL(file);
    }
  }

  /* Gérer le Drag & Drop */
  onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.uploadImage(file);
    }
  }

  /* Upload Image */
  uploadImage(file: File) {
    const url = this.app.setURL();
    const option = this.app.createCorsToken(true);
    const formData = new FormData();
    formData.append('photo', file);

    this.uploadService.uploadPostActuPhoto(formData, url, option).subscribe(
      response => {
        if (this.selectedArticle) {
          this.selectedArticle.picture = response.result;
          this.selectedArticle.picture.id = response.result.id;
          this.imagePreview = response.result.url;


          this.updateArticlePicture(response.result.id);
        }
      },
      error => {
        console.error("Erreur lors de l'upload de l'image :", error);
      }
    );
  }


  updateArticlePicture(pictureId: number) {
    if (!this.selectedArticle) {
      console.error("Aucun article sélectionné pour mettre à jour l'image");
      return;
    }

    const url = this.app.setURL();
    const option = this.app.createCorsToken();

    const body = {
      picture_id: pictureId // link l'image au bon article
    };

    this.actualityService.updatePostActu(this.selectedArticle.id, body, url, option).subscribe(response => {
      console.log("Image liée à l'article", response);
    }, error => {
      console.error("Erreur lors de la mise à jour de l'image dans l'article :", error);
    });
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
      game_id: this.selectedArticle.game?.id,
      provider_id: this.selectedArticle.Provider?.id,
      picture_id: this.selectedArticle.picture?.id,
      last_edit: new Date(),
      nb_edit: (this.selectedArticle.nb_edit ?? 0) + 1,
    };

    this.actualityService.updatePostActu(this.selectedArticle.id, body, url, option).subscribe(response => {
      console.log("Article mis à jour", response);
    });
  }


   /* Sélectionner un article sans rechargement */
   onArticleSelected(article: PostActuInterface) {
    this.selectedArticle = article;

    this.imagePreview = article.picture?.url ?? null;
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
      this.selectedArticle!.game = game;
      this.gameSearch = game.name;
      this.gameResults = [];
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
    this.selectedArticle!.Provider = provider;
    this.providerSearch = provider.displayName;
    this.providerResults = [];
  }
}
