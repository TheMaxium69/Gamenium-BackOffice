import { Component } from '@angular/core';
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-perms',
  templateUrl: './perms.component.html',
  styleUrls: ['./perms.component.css']
})
export class PermsComponent {

  constructor(protected app: AppComponent) { }

}
