import {Component, OnInit} from '@angular/core';
import {StatService} from "../../-service/stat.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-copy',
  templateUrl: './copy.component.html',
  styleUrls: ['./copy.component.css']
})
export class CopyComponent implements OnInit {

  AllStat: resultCopyStat | null = null;

  constructor(private statService: StatService,
              protected app: AppComponent) {
  }

  ngOnInit() {

    this.statService.getStatCopy(this.app.setURL(), this.app.createCorsToken()).subscribe((response: { message:string, result:resultCopyStat}) => {
      if (response.message === "good") {
        this.AllStat = response.result;
      } else {
        console.log("une erreur est survenue");
      }
    })


  }


}

export interface resultCopyStat {
  nb_hmg: number;
  nb_hmg_copy: number;
  nb_hmg_average: number;
  nb_hmp: number;
  nb_hmp_copy: number;
  nb_hmp_average: number;
}
