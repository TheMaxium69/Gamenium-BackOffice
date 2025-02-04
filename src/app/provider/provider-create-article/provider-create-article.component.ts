import { Component, ElementRef, ViewChild } from '@angular/core';
import { GameService } from 'src/app/-service/game.service';
import { UploadService } from 'src/app/-service/upload.service';
import { UserProviderService } from 'src/app/-service/user-provider.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-provider-create-article',
  templateUrl: './provider-create-article.component.html',
  styleUrls: ['./provider-create-article.component.css']
})
export class ProviderCreateArticleComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  title: string = "";
  content: string = "";
  picture_id: number = 0;
  game_id: number | null = null;
  provider_id!: number; // ✅ Provider is now required
  gameSearch: string = "";
  gameResults: any[] = [];
  imagePreview: string | null = null;
  imageClass: string = '';

  constructor(
    protected app:AppComponent,
    private uploadService: UploadService,
    private gameService: GameService,
    private userProviderService: UserProviderService
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
            this.imageClass = 'square'; // image carre = max width
          } else {
            this.imageClass = 'icon'; // petite icon reste petite
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

  searchGames() {
    if (this.gameSearch.length > 2) {
      const url = this.app.setURL();
      const options = this.app.createCorsToken();
      const body = { searchValue: this.gameSearch, limit: 10 };

      this.gameService.searchGames(body, url, options).subscribe(response => {
        this.gameResults = response;
      });
    }
  }

  selectGame(game: any) {
    this.game_id = game.id;
    this.gameSearch = game.name;
    this.gameResults = [];
  }

  submitArticle() {
    if (!this.picture_id) {
      console.error("No picture uploaded");
      return;
    }

    const url = this.app.setURL();
    const options = this.app.createCorsToken();
    const body: any = {
      title: this.title,
      content: this.content,
      picture_id: this.picture_id,
      provider_id: this.provider_id,
      created_at: new Date(),
      nb_edit: 0
    };

    if (this.game_id) {
      body.game_id = this.game_id;
    }

    this.userProviderService.createPostActuByProvider(body, url, options).subscribe(response => {
      console.log("Article created:", response);
    });
  }
}
