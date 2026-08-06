import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourtyOneComponent } from './home-ru-fourty-one.component';

describe('HomeRuFourtyOneComponent', () => {
  let component: HomeRuFourtyOneComponent;
  let fixture: ComponentFixture<HomeRuFourtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFourtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
