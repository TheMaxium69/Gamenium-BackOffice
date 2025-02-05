import { Component, ElementRef, ViewChild } from '@angular/core';
import { BadgeService } from 'src/app/-service/badge.service';
import { UploadService } from 'src/app/-service/upload.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-create-badge',
  templateUrl: './create-badge.component.html',
  styleUrls: ['./create-badge.component.css']
})
export class CreateBadgeComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

  name: string = "";
  unlockDescription: string = "";
  picture_id: number = 0;

  imagePreview: string | null = null;
  imageClass: string = '';

  constructor(
    protected app: AppComponent,
    private badgeService: BadgeService,
    private uploadService: UploadService
  ) {}

  
  triggerFileSelect() {
    this.fileInput.nativeElement.click();
  }

  
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.applyImageClass(this.imagePreview);
      };

      reader.readAsDataURL(file);
      this.uploadImage(file);
    }
  }

  
  onFileDropped(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      this.uploadImage(file);
    }
  }

  
  uploadImage(file: File) {
    const url = this.app.setURL();
    const option = this.app.createCorsToken(true);
    const formData = new FormData();
    formData.append('photo', file);

    this.uploadService.uploadProviderPhoto(formData, url, option).subscribe(
      response => {
        if (response.result) {
          this.picture_id = response.result.id;
          this.imagePreview = response.result.url;
          this.applyImageClass(this.imagePreview);
        }
      },
      error => {
        console.error("Erreur lors de l'upload de l'image :", error);
      }
    );
  }

  
  applyImageClass(imageUrl: string | null) {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      this.imageClass = '';

      if (aspectRatio > 1.3) {
        this.imageClass = 'horizontal';
      } else if (aspectRatio >= 0.8 && aspectRatio <= 1.3) {
        this.imageClass = 'square';
      } else {
        this.imageClass = 'icon';
      }
    };
  }

  
  submitBadge() {
    if (!this.picture_id) {
      console.error("Aucune image sélectionnée");
      return;
    }

    const url = this.app.setURL();
    const option = this.app.createCorsToken();
    
    const body = {
      name: this.name,
      unlockDescription: this.unlockDescription,
      picture_id: this.picture_id
    };

    this.badgeService.createBadge(body.name, body.picture_id, body.unlockDescription, url, option).subscribe(
      response => {
        console.log("Badge créé", response);
      },
      error => {
        console.error("Erreur lors de la création du badge :", error);
      }
    );
  }
}
