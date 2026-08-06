import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourtyFiveComponent } from './home-uk-fourty-five.component';

describe('HomeUkFourtyFiveComponent', () => {
  let component: HomeUkFourtyFiveComponent;
  let fixture: ComponentFixture<HomeUkFourtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
