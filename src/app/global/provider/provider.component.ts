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
export class ProviderComponent {

  @Input()
  public providerSelected: ProviderInterface|null = null;

  constructor(
    protected app: AppComponent
  ) {}

}
