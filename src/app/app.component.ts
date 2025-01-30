import { Component } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "./-service/auth.service";
import {ApicallInterface} from "./-interface/apicall.interface";
import {UserInterface} from "./-interface/user.interface";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private router: Router) {


    const cookieToken = this.cookieService.get('tokenGamenium');
    const cookieUser = this.cookieService.get('userGamenium');

    if (cookieToken && cookieUser){
      this.loginTokenWithCookie(cookieToken, cookieUser);
    } else {
      this.router.navigate(['/']);
    }


  }

  /******************************************************************************************************************
   *
   * VARIABLE GLOBAL
   *
   * ******************************************************************************************************************/

  //%     API - GAMENIUM      %//
    AppEnv: string = "DEVMAX"; // DEV or PROD or PRODMAX
    urlApiDev: string = "http://127.0.0.1:8000";
    urlApiDevMax: string = "https://127.0.0.1:8000";
    urlApiProd: string = "http://vps216.tyrolium.fr:8000";
    urlApiProdMax: string = "http://home.vps216.tyrolium.fr:8000";
    urlApiV1: string = "https://vps209.tyrolium.fr";
  //%     API - GAMENIUM      %//

  // SETTING
  Debug:Boolean = false;
  isLog: boolean = false;
  userConnected: UserInterface|any;
  token: string|any;
  currentDate: Date = new Date();

  // LIMIT
  fetchLimit:number = 50; // Limit search
  deadlineSearch:number = 300; // Time input search


  /******************************************************************************************************************
   *
   * CONNEXION
   *
   * ******************************************************************************************************************/

  logout(){
    this.isLog = false;
    this.token = null;
    this.userConnected = null;
    this.cookieService.delete('tokenGamenium');
    this.cookieService.delete('userGamenium');
    this.router.navigate(['/']);
  }

  /* FORMULAIRE */
  login(email:string, password:string){

    let bodyNoJson: any = {
      "email_auth": email,
      "mdp_auth": password
    }

    this.authService.postLoginUser(bodyNoJson, this.setURL()).subscribe((resultLogUser:ApicallInterface) => {

      if (resultLogUser.message == "Connected" && resultLogUser.token != null){

          /* CONNECTER PAR LE TOKEN*/
          this.loginToken(resultLogUser.token);
      } else {
        console.error('Erreur');
        /* TODO : GEREZ LES MSG D'ERR*/
      }

    }, (error) => console.error())

  }

  /* COOKIE */
  loginTokenWithCookie(cookieToken:string, cookieUser:string) {

    this.isLog = true;
    this.userConnected = JSON.parse(cookieUser);
    this.token = cookieToken;

    this.loginToken(cookieToken);

  }


  /* CONNECTER REEL */
  loginToken(token:string) {

    this.authService.postLoginToken(token, this.setURL()).subscribe((resultLogToken:ApicallInterface) => {

      if(resultLogToken.message == "Connected"){

        /* CONNECTER */
        this.token = token;
        this.userConnected = resultLogToken.result
        this.isLog = true;

        /* LES COOKIE */
        this.cookieService.set('tokenGamenium', token);
        this.cookieService.set('userGamenium', JSON.stringify(resultLogToken.result));

      } else {

        /* FORCER LA DECONNEXION*/
        this.token = null;
        this.userConnected = null;
        this.isLog = false;
        this.cookieService.delete('tokenGamenium');
        this.cookieService.delete('userGamenium');
        this.router.navigate(['/']);


        console.error('Erreur');
        /* TODO : GEREZ LES MSG D'ERR*/
      }

    }, (error) => console.error());


  }








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
    } else if (this.AppEnv == "DEVMAX") {
      return this.urlApiDevMax;
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
