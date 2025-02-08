import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../app.component";
import {PlatformService} from "../-service/platform.service";
import {PlateformInterface} from "../-interface/plateform.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(protected app: AppComponent,
              private platformSerivce:PlatformService) {
  }

  plateformRandom: PlateformInterface | undefined;

  ngOnInit() {


    this.randomPlateform()

  }


  randomPlateform(){
    this.platformSerivce.getPlateformsRandom(this.app.setURL(), this.app.createCorsToken()).subscribe((response : { message: string, result: PlateformInterface }) => {

      if (response.message === "good") {
        this.plateformRandom = response.result;
      }

    })
  }

}
