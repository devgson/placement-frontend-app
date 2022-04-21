declare const google: any;

import { MapsAPILoader } from '@agm/core';
import { Component, NgZone, OnInit } from '@angular/core';
import { TutorService } from '../../shared/services/tutor.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  placements = [];

  constructor(
    private tutorService: TutorService,
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngOnInit(): void {
    this.getPlacements();
  }

  getPlacements() {
    this.tutorService.getPlacements()
      .subscribe((value) => {
        this.placements = this.filterActive(value.data);
      })
  }

  filterActive(placements) {
    return placements.filter((placement) => 
      placement.status === 'active' && placement.latitude !== '0'
    );
  }

  ngAfterViewInit() {
    this.mapsAPILoader.load();
  }

}
