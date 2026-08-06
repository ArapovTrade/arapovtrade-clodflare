import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourtyTwoComponent } from './home-ru-fourty-two.component';

describe('HomeRuFourtyTwoComponent', () => {
  let component: HomeRuFourtyTwoComponent;
  let fixture: ComponentFixture<HomeRuFourtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFourtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
