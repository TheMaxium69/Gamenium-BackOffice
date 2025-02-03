import { Component, Input, numberAttribute, OnChanges, SimpleChanges } from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { ProviderService } from 'src/app/-service/provider.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})
export class ProviderComponent implements OnChanges {

  @Input({transform: numberAttribute})
  public id: number|null = null;

  providerSelected: ProviderInterface | undefined;

  constructor(
    protected app: AppComponent,
    private providerService: ProviderService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.id = changes['id'].currentValue;
      if (this.id) {
        this.getProvider(this.id);
      }
    }
  }

  getProvider(id:number) {
    this.providerService.getProviderById(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
      if (response.message === "good") {
        return this.providerSelected = response.result;
      } else {
        console.log("une erreur est survenue");
      }
    })
  }
}
