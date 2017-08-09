import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { powerComponent } from './power.component';

describe('powerComponent', () => {
  let component: powerComponent;
  let fixture: ComponentFixture<powerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ powerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(powerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
