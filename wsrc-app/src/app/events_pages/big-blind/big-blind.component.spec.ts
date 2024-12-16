import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBlindComponent } from './big-blind.component';

describe('BigBlindComponent', () => {
  let component: BigBlindComponent;
  let fixture: ComponentFixture<BigBlindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BigBlindComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigBlindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
