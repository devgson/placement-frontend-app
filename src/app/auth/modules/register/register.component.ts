import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private subs = new SubSink();

  registerAs = "student";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.subs.sink = this.route.queryParams.subscribe((param) => {
      const registerAs = param['as'];
      if (registerAs !== 'student' && registerAs !== 'tutor') return;
      this.registerAs = registerAs;
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}
