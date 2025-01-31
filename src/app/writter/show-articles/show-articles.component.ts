import { Component } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-show-articles',
  templateUrl: './show-articles.component.html',
  styleUrls: ['./show-articles.component.css']
})
export class ShowArticlesComponent {

  constructor(protected app: AppComponent) { }

}
