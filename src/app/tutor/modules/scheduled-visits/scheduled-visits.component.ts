import { Component, OnInit } from '@angular/core';
import { TutorService } from '../../shared/services/tutor.service';

@Component({
  selector: 'app-scheduled-visits',
  templateUrl: './scheduled-visits.component.html',
  styleUrls: ['./scheduled-visits.component.scss']
})
export class ScheduledVisitsComponent implements OnInit {

  placements;

  options = {
    events: [],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    selectable:true,
    selectMirror: true,
    dayMaxEvents: true,
  };

  constructor(private tutorService: TutorService) {}

  ngOnInit(): void {
    this.getScheduledPlacements();
  }

  getScheduledPlacements() {
    this.tutorService.getPlacements({ scheduledVisit: true })
      .subscribe((value) => {
        const placements = this.filterScheduledPlacements(value.data);
        const events = this.createEvents(placements);
        this.options.events = events;
        this.placements = placements;
      })
  }

  filterScheduledPlacements(placements) {
    return placements.filter((placement) => placement.scheduledVisitDate);
  }

  createEvents(placements) {
    return placements.map((placement, index) => {
      return {
        id: index + 1,
        backgroundColor: placement.scheduledVisitStatus === 'pending' ? 'red' : 'green',
        title: `${placement.student.fullName}, ${placement.scheduledVisitType}`,
        start: placement.scheduledVisitDate,
      }
    })
  }

}
