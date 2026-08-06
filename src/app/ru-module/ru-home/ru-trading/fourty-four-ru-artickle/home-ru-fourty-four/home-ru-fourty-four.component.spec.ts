import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourtyFourComponent } from './home-ru-fourty-four.component';

describe('HomeRuFourtyFourComponent', () => {
  let component: HomeRuFourtyFourComponent;
  let fixture: ComponentFixture<HomeRuFourtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFourtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
