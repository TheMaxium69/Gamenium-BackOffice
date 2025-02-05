import {Component, Input, numberAttribute, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { HistoryMyGameInterface } from 'src/app/-interface/history-my-game.interface';
import { HistoryMyGameService } from 'src/app/-service/history-my-game.service';
import { ModerationService } from 'src/app/-service/moderation.service';
import { AppComponent } from 'src/app/app.component';
import Swal from 'sweetalert2';
import {HmgTagsInterface} from "../../-interface/hmg-tags.interface";
import {HmgScreenshotInterface} from "../../-interface/hmg-screenshot.interface";

export interface preBodyHmg {
  copyGame_id:number|null
  speedrun_id:number|null,
  screenshot_id:number|null
  rate_id:number|null
  tag_id:number|null
  barcode: boolean
  buy_where: boolean
  content : boolean
  edition: boolean
  purchase_content: boolean
  category:boolean
  chrono:boolean
  link:boolean
}

@Component({
  selector: 'app-hmg-preview',
  templateUrl: './hmg-preview.component.html',
  styleUrls: ['./hmg-preview.component.css'],
})
export class HmgPreviewComponent implements OnInit, OnChanges{

  MyGame : HistoryMyGameInterface | undefined;

  @Input({transform: numberAttribute})
  public id: number|null = null;

  moderationState: preBodyHmg = {
    edition: false,
    barcode: false,
    content: false,
    buy_where: false,
    purchase_content: false,
    category: false,
    chrono: false,
    link: false,
    copyGame_id: null,
    speedrun_id : null,
    screenshot_id: null,
    rate_id: null,
    tag_id: null
  }


  constructor(
    private historyMyGameService: HistoryMyGameService,
    protected app: AppComponent,
    private moderationService: ModerationService
  ){}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
      if (changes['id']) {
        this.id = changes['id'].currentValue;
        if (this.id) {
          this.getMyHmg(this.id);
        }
      }
    }

  getMyHmg(idMyGame:number){
    this.historyMyGameService.getOneMyGame(idMyGame, this.app.setURL(), this.app.createCorsToken()).subscribe((responseMyGame : { message: string; result:HistoryMyGameInterface | undefined ;}) => {
      if(responseMyGame.message === "good"){
        this.MyGame = responseMyGame.result;
        console.log(this.MyGame);
      } else {
        console.log('echec récupération hmg : ' + responseMyGame.message);
      }
    })
  }

  OnClickDelete(champ: string, id: number, object: string|undefined = undefined){


    if (object == "speedrun"){
      (this.moderationState as any)[champ] = true
      this.moderationState.speedrun_id = id
    } else if (object == "screenshot"){
      this.moderationState.screenshot_id = id
    } else if (object == "rate"){
      this.moderationState.rate_id = id
    } else if (object == "tag"){
      this.moderationState.tag_id = id
    } else {
      (this.moderationState as any)[champ] = true
      this.moderationState.copyGame_id = id
    }


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
        this.updateHmg(this.moderationState, champ, object)
      } else {

        // remise à zéro
        if (object == "speedrun"){
          (this.moderationState as any)[champ] = false
          this.moderationState.speedrun_id = null
        } else if (object == "screenshot"){
          this.moderationState.screenshot_id = null
        } else if (object == "rate"){
          this.moderationState.rate_id = null
        } else if (object == "tag"){
          this.moderationState.tag_id = null
        } else {
          (this.moderationState as any)[champ] = false
          this.moderationState.copyGame_id = null
        }
      }})


  }

  updateHmg(prebody:preBodyHmg, champ:string, object: string|undefined){
    let body = JSON.stringify(prebody);

    this.moderationService.moderateHmg(body, this.app.setURL(), this.app.createCorsToken()).subscribe(response => {
          if(response.message === "good"){
            console.log('champ modéré');
            Swal.fire("Champ modéré", "", "success");

            if (object == "speedrun") {
              (this.MyGame?.speedrun as any)[champ] = "";
            } else if (object == "rate") {
              if (this.MyGame?.rate){
                this.MyGame.rate.content = "";
              }
            } else if (object == "tag") {
              if (this.moderationState.tag_id && this.MyGame?.myGame.hmgTags){
                this.MyGame.myGame.hmgTags = this.MyGame.myGame.hmgTags.filter((tag: HmgTagsInterface) => tag.id !== this.moderationState.tag_id);
              }
            } else if (object == "screenshot") {
              if (this.moderationState.screenshot_id && this.MyGame?.screenshot){
                this.MyGame.screenshot = this.MyGame.screenshot.filter((screenshot: HmgScreenshotInterface) => screenshot.id !== this.moderationState.screenshot_id);
              }
            } else {
              (this.MyGame?.copyGame as any)[champ] = "";
            }



          } else {
            console.log('erreur modération');
            Swal.fire("Erreur de nos services", "", "error");
          }

          // remise à zéro
          if (object == "speedrun"){
            (this.moderationState as any)[champ] = false
            this.moderationState.speedrun_id = null
          } else if (object == "screenshot"){
            this.moderationState.screenshot_id = null
          } else if (object == "rate"){
            this.moderationState.rate_id = null
          } else if (object == "tag"){
            this.moderationState.tag_id = null
          } else {
            (this.moderationState as any)[champ] = false
            this.moderationState.copyGame_id = null
          }
        })

  }


}
