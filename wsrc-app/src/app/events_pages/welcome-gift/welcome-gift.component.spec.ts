import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeGiftComponent } from './welcome-gift.component';

describe('WelcomeGiftComponent', () => {
  let component: WelcomeGiftComponent;
  let fixture: ComponentFixture<WelcomeGiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WelcomeGiftComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WelcomeGiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
