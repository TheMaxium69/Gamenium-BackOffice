import { Component, Input, numberAttribute, OnChanges, SimpleChanges } from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { ProviderService } from 'src/app/-service/provider.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {

  constructor(
    protected app: AppComponent,
    private providerService: ProviderService
  ) {}

  providerSelected: ProviderInterface | undefined;

  updateProfil() {
    if (!this.providerSelected) {
      console.error("Aucun provider sélectionné");
      return;
    }
    
    const url = this.app.setURL();
    const option = this.app.createCorsToken();

    const body = {
      title: this.providerSelected.displayName,
      content: this.providerSelected.content,
      picture_id: this.providerSelected.picture?.id,
    };
    

    this.providerService.updateProvider(this.providerSelected.id, body, url, option).subscribe(response => {
      console.log("Article mis à jour", response);
    });
  }
}
