import { Component } from '@angular/core';
import { ActualityService } from 'src/app/-service/actuality.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css']
})
export class CreateArticleComponent {

title: string = "";
content: string = "";
picture_id: number = 0;
game_id: number = 0;


  constructor(
    protected app:AppComponent,
    private actualityService:ActualityService
  ) {

  }

  submitArticle(){

    const url = this.app.setURL();
    const option = this.app.createCorsToken();
    const body = {
      title:this.title,
      content:this.content,
      picture_id:this.picture_id,
      game_id:this.game_id,
      createdAt:new Date(),
    }

    this.actualityService.createPostActu(body, url, option).subscribe(response => {
      console.log("Article créer", response)
    } )
  }
}
