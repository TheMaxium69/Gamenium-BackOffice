import {Component, Input, numberAttribute, OnChanges, SimpleChanges} from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { ProfilInterface } from 'src/app/-interface/profil.interface';
import { ModerationService } from 'src/app/-service/moderation.service';
import { ProfilService } from 'src/app/-service/profil.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profil-preview',
  templateUrl: './profil-preview.component.html',
  styleUrls: ['./profil-preview.component.css']
})
export class ProfilPreviewComponent implements OnChanges {

  @Input({transform: numberAttribute})
  public id: number|null = null;

  profilSelected: ProfilInterface | undefined;

  constructor(
    protected app: AppComponent,
    private moderationService: ModerationService,
    private profilService: ProfilService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.id = changes['id'].currentValue;
      if (this.id) {
        this.getProfil(this.id);
      }
    }
  }

  filterIpArray(value: any, index: any, array: any) {
    return array.indexOf(value) === index;
  }

  getProfil(id:number) {
    this.profilService.getProfilByUserId(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
      if (response.message === "good") {
        console.table(response.result)
        return this.profilSelected = response.result;
      } else {
        console.log("une erreur est survenue");
      }
    })
  }

  deleteProfil() {
    Swal.fire({
      icon: "question",
      title: "Demande de confirmation",
      text: "Etes vous sur de vouloir supprimer la photo de profil de cet utilisateur ?",
      showConfirmButton: false,
      showDenyButton: true,
      showCancelButton: true,
      denyButtonText: `Supprimer`,
      cancelButtonText: "Annuler"
    }).then((result) => {
      if (result.isDenied) {

        if (this.profilSelected) {
          const bodyJSON = JSON.stringify({
            'profil_id': this.profilSelected.id
          });
          
          this.moderationService.moderateDeletePP(bodyJSON, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
            console.log(response);
            if (response.message == 'good') {
              if (this.profilSelected) {
                this.profilSelected.picture = undefined;
              }
              Swal.fire("Photo supprimée", "", "success");
            } else {
              Swal.fire("Erreur de nos services", "", "error");
            }
          })
        }
      }
    });
  }
}
