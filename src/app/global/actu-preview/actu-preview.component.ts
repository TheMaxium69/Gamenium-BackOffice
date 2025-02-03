import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { ApicallInterface } from 'src/app/-interface/apicall.interface';
import { PostActuInterface } from 'src/app/-interface/post-actu.interface';
import { ActualityService } from 'src/app/-service/actuality.service';
import { AppComponent } from 'src/app/app.component';
import {ViewService} from "../../-service/view.service";

@Component({
  selector: 'app-actu-preview',
  templateUrl: './actu-preview.component.html',
  styleUrls: ['./actu-preview.component.css']
})
export class ActuPreviewComponent implements OnInit, OnChanges {

  @Input({transform: numberAttribute})
  public id: number|null = null;

  actuSelected: PostActuInterface | undefined;
  viewActu: number = 0;

  constructor(
    protected app: AppComponent,
    private actualityServcice: ActualityService,
    private viewService: ViewService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['id']) {
      this.id = changes['id'].currentValue;
      if (this.id) {
        this.getActu(this.id);
      }
    }
  }

  getActu(id: number) {
      this.actualityServcice.getPostActu(this.app.setURL(), id, this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
        if (response.message === 'good') {
          console.log("Actu preview");
          console.table(response.result);
          this.actuSelected = response.result;
        }
      })
      this.viewService.getPostActuViews(id, this.app.setURL(), this.app.createCorsToken()).subscribe((response: ApicallInterface) => {
        if (response.message === 'good') {
          this.viewActu = response.result;
        }
      })

  }
}
