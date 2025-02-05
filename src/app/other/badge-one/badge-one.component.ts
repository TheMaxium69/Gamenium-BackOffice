import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-badge-one',
  templateUrl: './badge-one.component.html',
  styleUrls: ['./badge-one.component.css']
})
export class BadgeOneComponent implements OnInit {

  id: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
