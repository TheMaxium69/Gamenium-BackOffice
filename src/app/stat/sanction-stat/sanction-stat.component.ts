import {Component, OnInit} from '@angular/core';
import {StatService} from "../../-service/stat.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-sanction-stat',
  templateUrl: './sanction-stat.component.html',
  styleUrls: ['./sanction-stat.component.css']
})
export class SanctionStatComponent implements OnInit {

  displayedColumns: string[] = ['type', 'nb'];
  SanctionStat: resultSanctionStat | null = null;
  dataSource: string[] = new Array<string>();

  constructor(private statService: StatService,
              private app: AppComponent) {
  }

  ngOnInit() {

    this.statService.getStatSanction(this.app.setURL(), this.app.createCorsToken()).subscribe((response: { message:string, result:resultSanctionStat}) => {
      if (response.message === "good") {
        this.SanctionStat = response.result;
        console.log(this.SanctionStat);
        this.dataSource = this.SanctionStat.nb_types;
      } else {
        console.log("une erreur est survenue");
      }
    })

  }







}

export interface resultSanctionStat {
  nb_sanction: number;
  nb_types: string[];
  types: string[];
}

