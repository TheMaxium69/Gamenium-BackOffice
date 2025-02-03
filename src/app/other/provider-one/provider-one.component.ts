import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProviderService} from "../../-service/provider.service";
import {AppComponent} from "../../app.component";
import {ProviderInterface} from "../../-interface/provider.interface";

@Component({
  selector: 'app-provider-one',
  templateUrl: './provider-one.component.html',
  styleUrls: ['./provider-one.component.css']
})
export class ProviderOneComponent implements OnInit {

  id: any | null = null;
  providerSelected: ProviderInterface | null = null;

  constructor(private route: ActivatedRoute,
              private providerService: ProviderService,
              private app: AppComponent) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.providerService.getProviderById(this.id, this.app.setURL(), this.app.createCorsToken()).subscribe((reponse: {message:string,result:ProviderInterface}) => {

        if (reponse.message === "good") {
          this.providerSelected = reponse.result;
        } else {
          console.log("une erreur est survenue");
        }

      })
    }

  }
}
