import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-provider-one',
  templateUrl: './provider-one.component.html',
  styleUrls: ['./provider-one.component.css']
})
export class ProviderOneComponent implements OnInit {

  id: string | null = null;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
