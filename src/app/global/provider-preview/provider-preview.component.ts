import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { ProviderInterface } from 'src/app/-interface/provider.interface';
import { ProviderService } from 'src/app/-service/provider.service';
import { AppComponent } from 'src/app/app.component';
import {ViewService} from "../../-service/view.service";

@Component({
  selector: 'app-provider',
  templateUrl: './provider-preview.component.html',
  styleUrls: ['./provider-preview.component.css']
})
export class ProviderPreviewComponent implements OnChanges{

  @Input()
  public providerSelected: ProviderInterface|null = null;

  viewProvider: number = 0;

  constructor(
    protected app: AppComponent,
    private viewService: ViewService,
  ) {}

  getView(id:number): void {
    this.viewService.getProviderViews(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
      if (response.message === 'good') {
        this.viewProvider = response.result;
      } else {

        console.log("une erreur est survenue");
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['providerSelected']) {
      this.providerSelected = changes['providerSelected'].currentValue;
      if (this.providerSelected) {
        this.getView(this.providerSelected.id);
      }
    }
  }


}
