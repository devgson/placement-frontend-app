import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ViewAuthorizationRequestComponent } from './view-authorization-request.component';

describe('ViewAuthorizationRequestComponent', () => {
  let component: ViewAuthorizationRequestComponent;
  let fixture: ComponentFixture<ViewAuthorizationRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAuthorizationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAuthorizationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
