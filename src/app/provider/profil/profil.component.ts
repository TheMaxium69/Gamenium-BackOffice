import { Component, ElementRef, Input, numberAttribute, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { ProviderService } from 'src/app/-service/provider.service';
import { UploadService } from 'src/app/-service/upload.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  @Input({transform: numberAttribute})
  public id: number|null = null;
  public providerSelected: ProviderInterface | undefined;

  constructor(
    protected app: AppComponent,
    private providerService: ProviderService,
    private uploadService: UploadService,
  ) {}

  @ViewChild('fileInput') fileInput!: ElementRef; 

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
        this.providerSelected!.picture = response.result; // Mise à jour de l'image
      });
    }
  }

  updateProfil() {  
    if (!this.providerSelected) {
      console.error("Aucun provider sélectionné");
      return;
    }
    
    const url = this.app.setURL();
    const option = this.app.createCorsToken();

    const body = {
      displayName: this.providerSelected.displayName,
      content: this.providerSelected.content,
      picture_id: this.providerSelected.picture?.id,
      founded_at: this.providerSelected.founded_at,
    };


    this.providerService.updateProvider(this.providerSelected.id, body, url, option).subscribe(response => {
      console.log("Éditeur mis à jour", response);
    });
  }
}
