import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoubleRPComponent } from './double-rp.component';

describe('DoubleRPComponent', () => {
  let component: DoubleRPComponent;
  let fixture: ComponentFixture<DoubleRPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoubleRPComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoubleRPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
