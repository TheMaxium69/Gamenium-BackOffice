import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { ActualityService } from 'src/app/-service/actuality.service';
import { GameService } from 'src/app/-service/game.service';
import { ProviderService } from 'src/app/-service/provider.service';
import { UploadService } from 'src/app/-service/upload.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

title: string = "";
content: string = "";
picture_id: number = 0;
game_id: number = 0;
provider_id?: number;

gameSearch: string = "";
gameResults: any[] = [];

providerSearch: string = "";
providerResults: ProviderInterface[] = [];

imagePreview: string | null = null;
imageClass: string = '';



  constructor(
    protected app:AppComponent,
    private actualityService:ActualityService,
    private gameService:GameService,
    private providerService: ProviderService,
    private uploadService:UploadService,
    private router: Router
  ) {

  }

  // Selection fichier via click
  triggerFileSelect() {
    this.fileInput.nativeElement.click(); // ouvre le gestionnaire de fichier
  }

  // Gere la selection du fichier
  onFileSelected(event: any) {
    console.log("File selected event:", event); // Debugging
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;

        // crée une image pour recup le ratio
        const img = new Image();
        img.src = this.imagePreview;
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          console.log("Aspect Ratio:", aspectRatio); // debug

          // reset la class
          this.imageClass = '';

          // applique la bonne classe selon le ratio
          if (aspectRatio > 1.3) {
            this.imageClass = 'horizontal'; // image horizontal = largeur total
          } else if (aspectRatio >= 0.8 && aspectRatio <= 1.3) {
            this.imageClass = 'horizontal'; // image carre = max width
          } else {
            this.imageClass = 'horizontal'; // petite icon reste petite
          }
        };

        // ensuite on continue l'upload de l'image
        this.uploadImage(file);
      };

      reader.readAsDataURL(file);
    }
  }


  // gerer drag and drop
  onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      console.log("File dropped:", event.dataTransfer.files[0]); // debug
      const file = event.dataTransfer.files[0];
      this.uploadImage(file);
    }
  }

  // Upload Image
  uploadImage(file: File) {
    console.log("Uploading file:", file.name); // debug

    const url = this.app.setURL();
    const option = this.app.createCorsToken(true);

    const formData = new FormData();
    formData.append('photo', file);

    this.uploadService.uploadProviderPhoto(formData, url, option).subscribe(response => {
      console.log("Image uploaded:", response);
      this.picture_id = response.result.id;
      this.imagePreview = response.result.url;
    }, error => {
      console.error("Upload error:", error);
    });
  }




  //Recherche Provider
  searchProviders() {
    if (this.providerSearch.length > 2) {
      const url = this.app.setURL();
      const option = this.app.createCorsToken();

      this.providerService.searchProviders(this.providerSearch, 10, url, option)
        .subscribe(response => {
          this.providerResults = response as ProviderInterface[];
        }, error => {
          console.error("Error fetching providers:", error);
          this.providerResults = [];
        });
    }
  }



  selectProvider(provider: any) {
    this.provider_id = provider.id;
    this.providerSearch = provider.displayName;
    this.providerResults = []; //cache la liste après
  }

  confirmSubmitArticle() {
    if (!this.picture_id) {
      Swal.fire({
        title: "Image requise",
        text: "Veuillez ajouter une image avant de publier l'article.",
        icon: "warning",
        confirmButtonText: "OK"
      });
      return;
    }

    Swal.fire({
      title: "Confirmer la publication",
      text: "Êtes-vous sûr de vouloir publier cet article ?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Oui, publier",
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isConfirmed) {
        this.submitArticle();
        this.router.navigate(['/writter/show-articles']);
        Swal.fire("Crée!", "L'article a été crée avec succès.", "success");
      }
    });
  }

  submitArticle(){
    if (!this.picture_id) {
      console.error("No picture uploaded");
      return;
    }
    const url = this.app.setURL();
    const option = this.app.createCorsToken();
    let body:any = {
      title:this.title,
      content:this.content,
      picture_id: this.picture_id,
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
    this.gameResults = []; // cache la liste apres
  }
}
