import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CreateAuthorizationRequestComponent } from './create-authorization-request.component';

describe('CreateAuthorizationRequestComponent', () => {
  let component: CreateAuthorizationRequestComponent;
  let fixture: ComponentFixture<CreateAuthorizationRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAuthorizationRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAuthorizationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
