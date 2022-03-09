import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AuthorizationRequestsComponent } from './authorization-requests.component';

describe('AuthorizationRequestsComponent', () => {
  let component: AuthorizationRequestsComponent;
  let fixture: ComponentFixture<AuthorizationRequestsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
