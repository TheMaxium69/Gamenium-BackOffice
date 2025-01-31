import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { ActualityService } from 'src/app/-service/actuality.service';
import { GameService } from 'src/app/-service/game.service';
import { ProviderService } from 'src/app/-service/provider.service';
import { UploadService } from 'src/app/-service/upload.service';
import { AppComponent } from 'src/app/app.component';

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
    private uploadService:UploadService
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
  
        // Create an image object to check its dimensions
        const img = new Image();
        img.src = this.imagePreview;
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          console.log("Aspect Ratio:", aspectRatio); // Debugging
  
          // Reset class
          this.imageClass = '';
  
          // Apply appropriate class based on aspect ratio
          if (aspectRatio > 1.3) {
            this.imageClass = 'horizontal'; // Wide images take full width
          } else if (aspectRatio >= 0.8 && aspectRatio <= 1.3) {
            this.imageClass = 'square'; // Square images get moderate max width
          } else {
            this.imageClass = 'icon'; // Small icons stay small
          }
        };
  
        // Continue with image upload
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
  
    this.uploadService.uploadPostActuPhoto(file, url, option).subscribe(response => {
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
