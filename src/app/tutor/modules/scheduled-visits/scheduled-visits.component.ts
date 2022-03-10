import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scheduled-visits',
  templateUrl: './scheduled-visits.component.html',
  styleUrls: ['./scheduled-visits.component.scss']
})
export class ScheduledVisitsComponent implements OnInit {

  options = {
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    selectable:true,
    selectMirror: true,
    dayMaxEvents: true
};

  constructor() {}

  ngOnInit(): void {}

}
