import {Component, Input} from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-show-articles',
  templateUrl: './show-articles.component.html',
  styleUrls: ['./show-articles.component.css']
})
export class ShowArticlesComponent {
  @Input() dashboard!: boolean;

  constructor(protected app: AppComponent) { }

}
