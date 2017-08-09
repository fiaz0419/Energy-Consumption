import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicanceComponent } from './applicance.component';

describe('ApplicanceComponent', () => {
  let component: ApplicanceComponent;
  let fixture: ComponentFixture<ApplicanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
