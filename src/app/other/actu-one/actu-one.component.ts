import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-actu-one',
  templateUrl: './actu-one.component.html',
  styleUrls: ['./actu-one.component.css']
})
export class ActuOneComponent implements OnInit {

  id: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}

