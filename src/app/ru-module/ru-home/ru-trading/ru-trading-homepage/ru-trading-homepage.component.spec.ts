import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuTradingHomepageComponent } from './ru-trading-homepage.component';

describe('RuTradingHomepageComponent', () => {
  let component: RuTradingHomepageComponent;
  let fixture: ComponentFixture<RuTradingHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RuTradingHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RuTradingHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
