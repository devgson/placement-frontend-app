import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-tutor',
  templateUrl: './view-tutor.component.html',
  styleUrls: ['./view-tutor.component.scss']
})
export class ViewTutorComponent implements OnInit {
  @Input() tutor;

  constructor() { }

  ngOnInit(): void {
  }

}
