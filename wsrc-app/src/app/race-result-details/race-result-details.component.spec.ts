import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceResultDetailsComponent } from './race-result-details.component';

describe('RaceResultDetailsComponent', () => {
  let component: RaceResultDetailsComponent;
  let fixture: ComponentFixture<RaceResultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceResultDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceResultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
