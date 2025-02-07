import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-hmg-one',
  templateUrl: './hmg-one.component.html',
  styleUrls: ['./hmg-one.component.css']
})
export class HmgOneComponent implements OnInit {

  id: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
