import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceExtendedDetailsComponent } from './race-extended-details.component';

describe('RaceExtendedDetailsComponent', () => {
  let component: RaceExtendedDetailsComponent;
  let fixture: ComponentFixture<RaceExtendedDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RaceExtendedDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaceExtendedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
