import {Component, OnInit} from '@angular/core';
import {WarnInterface} from "../../-interface/warn.interface";
import { ActivatedRoute } from '@angular/router';
import { WarnService } from 'src/app/-service/warn.service';
import { AppComponent } from 'src/app/app.component';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';

@Component({
  selector: 'app-warn-one',
  templateUrl: './warn-one.component.html',
  styleUrls: ['./warn-one.component.css']
})
export class WarnOneComponent implements OnInit {

  warnSelected:WarnInterface|null = null;
  warnId: number | undefined;

  constructor(
    private app: AppComponent,
    private activatedRoute: ActivatedRoute,
    private warnService: WarnService
  ) {}

  ngOnInit() {
  //   Recupere l'id de warn dans la route
  this.warnId = this.activatedRoute.snapshot.params['id'];
  
  //   envoyé a l'api une demande pour un get one de warn (a codé)
  //   une fois fait faut simplement l'affiché
  
}
  getWarnSelected(id: number) {

  this.warnService.getOneWarn(this.app.setURL(), this.app.createCorsToken(), id).subscribe((response: ApicallInterface) => {
    if (response.message === "good") {
      return this.warnSelected = response.result;
    } else {
      console.log('Pas de warn');
    }
  })
      
  }
}

