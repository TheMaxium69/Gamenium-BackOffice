import {Component, OnInit} from '@angular/core';
import {StatService} from "../../-service/stat.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-global-stat',
  templateUrl: './global-stat.component.html',
  styleUrls: ['./global-stat.component.css']
})
export class GlobalStatComponent implements OnInit {

  AllStat: resultGlobalStat | null = null;

  constructor(private statService: StatService,
              private app: AppComponent) {
  }

  ngOnInit() {

    this.statService.getStatGlobal(this.app.setURL(), this.app.createCorsToken()).subscribe((response: { message:string, result:resultGlobalStat}) => {
      if (response.message === "good") {
        this.AllStat = response.result;
      } else {
        console.log("une erreur est survenue");
      }
    })


  }


}

export interface resultGlobalStat {
  nb_user: number;
  roles: {
    nb_owner: number;
    nb_admin: number;
    nb_modo_red: number;
    nb_modo_super: number;
    nb_modo: number;
    nb_write_res: number;
    nb_write_super: number;
    nb_write: number;
    nb_test_res: number;
    nb_test: number;
    nb_provider_admin: number;
    nb_provider: number;
    nb_beta: number;
    nb_ban: number;
  };
  nb_game: number;
  nb_actu: number;
}
