import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-placement',
  templateUrl: './view-placement.component.html',
  styleUrls: ['./view-placement.component.scss']
})
export class ViewPlacementComponent implements OnInit {

  rating = 3;

  constructor() { }

  ngOnInit(): void {
  }

}
