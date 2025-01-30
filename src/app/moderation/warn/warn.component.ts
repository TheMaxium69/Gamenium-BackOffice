import { Component, OnInit } from '@angular/core';
import { WarnInterface } from 'src/app/-interface/warn.interface';
import { WarnService } from 'src/app/-service/warn.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.css']
})
export class WarnComponent implements OnInit{

  allWarns: WarnInterface[] = [];
 constructor(
  private warnService: WarnService,
  private app:AppComponent
 ){}

 ngOnInit(): void {
   this.getAllWarn()
 }

 getAllWarn(){
  this.warnService.getAllWarn(this.app.setURL(), this.app.createCorsToken()).subscribe((response: {
    message: string, result:WarnInterface[]}) => {
      if(response.message === "good"){
        this.allWarns = response.result;
      } else {
        console.log('erreur recupération warns' + response.message);
      }
    })
 }
}
