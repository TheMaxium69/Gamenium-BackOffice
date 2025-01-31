import {Component, Input, numberAttribute, OnChanges, SimpleChanges} from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { ProfilInterface } from 'src/app/-interface/profil.interface';
import { ProfilService } from 'src/app/-service/profil.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profil-preview',
  templateUrl: './profil-preview.component.html',
  styleUrls: ['./profil-preview.component.css']
})
export class ProfilPreviewComponent implements OnChanges {

  @Input({transform: numberAttribute})
  public id: number|null = null;

  profilSelected: ProfilInterface | undefined;
  colorDefault = this.app.colorDefault;

  constructor(
    private app: AppComponent,
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

}
