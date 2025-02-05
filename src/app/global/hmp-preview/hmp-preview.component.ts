import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HistoryMyPlatformInterface } from 'src/app/-interface/history-my-platform.interface';
import { HistoryMyPlatformService } from 'src/app/-service/history-my-platform.service';
import { ModerationService } from 'src/app/-service/moderation.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';

export interface preBodyHmp {
  barcode: boolean 
  buy_where: boolean
  content : boolean
  copyPlateform_id:number
  edition: boolean
  purchase_content: boolean
}


@Component({
  selector: 'app-hmp-preview',
  templateUrl: './hmp-preview.component.html',
  styleUrls: ['./hmp-preview.component.css']
})
export class HmpPreviewComponent implements OnInit, OnChanges{
MyPlatform : HistoryMyPlatformInterface | undefined;

  @Input({transform: numberAttribute})
  public id: number|null = null;

  moderationState = {
    edition: false,
    barcode: false,
    content: false,
    buy_where: false,
    purchase_content: false
  }


  constructor(
    private historyMyPlatformService: HistoryMyPlatformService,
    protected app: AppComponent,
    private moderationService: ModerationService
  ){}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['id']) {
        this.id = changes['id'].currentValue;
        if (this.id) {
          this.getMyHmp(this.id);
        }
      }
    }

  getMyHmp(idMyPlatform:number){
    this.historyMyPlatformService.getOneMyHmpById(idMyPlatform, this.app.setURL(), this.app.createCorsToken()).subscribe((responseMyPlatform : { message: string; result:HistoryMyPlatformInterface | undefined ;}) => {
      if(responseMyPlatform.message === "good"){
        this.MyPlatform = responseMyPlatform.result;
        console.log(this.MyPlatform);
      } else {
        console.log('echec récupération hmg : ' + responseMyPlatform.message);
      }
    })
  }

  OnClickDelete(champ: keyof typeof this.moderationState, id: number){
    Object.keys(this.moderationState).forEach(key => {
        this.moderationState[key as keyof typeof this.moderationState] = false;
    });

    this.moderationState[champ] = true;

    Swal.fire({
          icon: "question",
          title: "Demande de confirmation",
          text: "Etes vous sur de vouloir supprimer le champ de cet exemplaire ?",
          showConfirmButton: false,
          showDenyButton: true,
          showCancelButton: true,
          denyButtonText: `Supprimer`,
          cancelButtonText: "Annuler"
        }).then((result) => {
          if (result.isDenied) {
            this.updateHmp({...this.moderationState, copyPlateform_id: id}, champ)
          }})
  }

  updateHmp(prebody:preBodyHmp, champ:string){

    console.log(prebody);
    console.log(champ);

    let body = JSON.stringify(prebody);

    this.moderationService.moderateHmp(body, this.app.setURL(), this.app.createCorsToken()).subscribe(response => {
      if(response.message === "good"){
        console.log('champ modéré');
        Swal.fire("Champ modéré", "", "success");
          const elem = document.getElementById(champ) as HTMLElement;
          elem.innerText = "Non renseigné";
      } else {
        console.log('erreur modération');
        Swal.fire("Erreur de nos services", "", "error");
      }
    })

  }  
}
