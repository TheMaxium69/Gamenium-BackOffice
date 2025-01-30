import {Component, OnInit} from '@angular/core';
import {WarnInterface} from "../../-interface/warn.interface";

@Component({
  selector: 'app-warn-one',
  templateUrl: './warn-one.component.html',
  styleUrls: ['./warn-one.component.css']
})
export class WarnOneComponent implements OnInit {

  warnSelected:WarnInterface|null = null;

  ngOnInit() {

  //   Recupere l'id de warn dans la route
  //   envoyé a l'api une demande pour un get one de warn (a codé)
  //   une fois fait faut simplement l'affiché


  }

}
