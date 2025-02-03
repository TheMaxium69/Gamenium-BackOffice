import {Component, OnInit} from '@angular/core';
import {StatService} from "../../-service/stat.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-global-stat',
  templateUrl: './global-stat.component.html',
  styleUrls: ['./global-stat.component.css']
})
export class GlobalStatComponent implements OnInit {

  displayedColumns: string[] = ['role', 'nb'];
  AllStat: resultGlobalStat | null = null;
  dataSource: string[] = roles;

  constructor(private statService: StatService,
              protected app: AppComponent) {
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
  roles: RoleStats;
  nb_game: number;
  nb_actu: number;
}


export interface RoleStats {
  [role: string]: number;
}

export const roles: string[] = [
  'ROLE_OWNER',
  'ROLE_ADMIN',

  'ROLE_MODO_RESPONSABLE',
  'ROLE_MODO_SUPER',
  'ROLE_MODO',

  'ROLE_WRITE_RESPONSABLE',
  'ROLE_WRITE_SUPER',
  'ROLE_WRITE',

  'ROLE_TEST_RESPONSABLE',
  'ROLE_TEST',

  'ROLE_PROVIDER_ADMIN',
  'ROLE_PROVIDER',

  'ROLE_BETA',
  'ROLE_BAN'
];
