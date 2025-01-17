import { Component } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  /******************************************************************************************************************
   *
   * VARIABLE GLOBAL
   *
   * ******************************************************************************************************************/

  //%     API - GAMENIUM      %//
    AppEnv: string = "PROD"; // DEV or PROD or PRODMAX
    urlApiDev: string = "http://127.0.0.1:8000";
    urlApiDevMax: string = "https://127.0.0.1:8000";
    urlApiProd: string = "http://vps216.tyrolium.fr:8000";
    urlApiProdMax: string = "http://home.vps216.tyrolium.fr:8000";
    urlApiV1: string = "https://vps209.tyrolium.fr";
  //%     API - GAMENIUM      %//

  // SETTING
  Debug:Boolean = true;
  isLog: boolean = false;
  userConnected: any;
  token: string|any;
  currentDate: Date = new Date();



  /******************************************************************************************************************
   *
   * CONNEXION
   *
   * ******************************************************************************************************************/


  /*****************************************************************************************************************
   *
   * FUNCTION GLOBAL
   *
   * ******************************************************************************************************************/

  //CORS With TOKEN
  createCorsToken(isFormData: boolean = false): {headers: HttpHeaders} {

    let headers: HttpHeaders;

    if (!isFormData){
      headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+this.token,
      });
    } else {
      headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.token,
      });


      headers.append('Content-Type', 'multipart/form-data');


    }
    const options: {headers: HttpHeaders}  = { headers: headers };

    return options;

  }

  //SET URL API
  setURL():string {

    if (this.AppEnv == "DEV"){
      return this.urlApiDev;
    } else if (this.AppEnv == "PROD") {
      return this.urlApiProd;
    } else if (this.AppEnv == "PRODMAX") {
      return this.urlApiProdMax;
    } else if (this.AppEnv == "V1") {
      return this.urlApiV1;
    } else {
      return this.urlApiV1;
    }

  }

}
