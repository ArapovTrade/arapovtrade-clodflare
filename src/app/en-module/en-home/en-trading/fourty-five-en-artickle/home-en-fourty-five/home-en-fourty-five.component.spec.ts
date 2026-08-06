import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFourtyFiveComponent } from './home-en-fourty-five.component';

describe('HomeEnFourtyFiveComponent', () => {
  let component: HomeEnFourtyFiveComponent;
  let fixture: ComponentFixture<HomeEnFourtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFourtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFourtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
