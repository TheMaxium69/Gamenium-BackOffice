import {
  Component,
  ElementRef,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { UploadService } from 'src/app/-service/upload.service';
import { AppComponent } from 'src/app/app.component';
import {UserProviderService} from "../../-service/user-provider.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public providerSelected: ProviderInterface | undefined;

  constructor(
    protected app: AppComponent,
    private userProviderService: UserProviderService,
    private uploadService: UploadService,

  ) {}

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit() {


    this.userProviderService.getProviderByUser(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {message:string, result:ProviderInterface}) => {
      if (response.message === "good") {
        this.providerSelected = response.result;
      } else if (response.message === "no provider") {
        console.log("Tu n'a pas encore de provider atitré");
      } else {
        console.log("une erreur est survenue");
      }
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
      const url = this.app.setURL();
      const option = this.app.createCorsToken(true);
      const formdata = new FormData();
      formdata.append('photo', file);
      this.uploadService.uploadProviderPhoto(formdata, url, option).subscribe(response => {
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


    this.userProviderService.updateProvider(this.providerSelected.id, body, url, option).subscribe(response => {
      console.log("Éditeur mis à jour", response);
    });
  }
}
