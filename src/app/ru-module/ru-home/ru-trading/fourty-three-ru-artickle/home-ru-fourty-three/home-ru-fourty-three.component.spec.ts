import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourtyThreeComponent } from './home-ru-fourty-three.component';

describe('HomeRuFourtyThreeComponent', () => {
  let component: HomeRuFourtyThreeComponent;
  let fixture: ComponentFixture<HomeRuFourtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFourtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
