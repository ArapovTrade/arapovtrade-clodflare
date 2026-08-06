import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourtyFiveComponent } from './home-ru-fourty-five.component';

describe('HomeRuFourtyFiveComponent', () => {
  let component: HomeRuFourtyFiveComponent;
  let fixture: ComponentFixture<HomeRuFourtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFourtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
