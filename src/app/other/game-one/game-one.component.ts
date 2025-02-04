import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-one',
  templateUrl: './game-one.component.html',
  styleUrls: ['./game-one.component.css']
})
export class GameOneComponent implements OnInit {

  id: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}

