import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFourtyThreeComponent } from './home-en-fourty-three.component';

describe('HomeEnFourtyThreeComponent', () => {
  let component: HomeEnFourtyThreeComponent;
  let fixture: ComponentFixture<HomeEnFourtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFourtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFourtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
