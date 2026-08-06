import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkTradingHomepageComponent } from './uk-trading-homepage.component';

describe('UkTradingHomepageComponent', () => {
  let component: UkTradingHomepageComponent;
  let fixture: ComponentFixture<UkTradingHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UkTradingHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UkTradingHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
