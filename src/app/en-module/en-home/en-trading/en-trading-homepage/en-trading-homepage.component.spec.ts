import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnTradingHomepageComponent } from './en-trading-homepage.component';

describe('EnTradingHomepageComponent', () => {
  let component: EnTradingHomepageComponent;
  let fixture: ComponentFixture<EnTradingHomepageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnTradingHomepageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnTradingHomepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
