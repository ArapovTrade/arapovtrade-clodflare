import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFourtyTwoComponent } from './home-en-fourty-two.component';

describe('HomeEnFourtyTwoComponent', () => {
  let component: HomeEnFourtyTwoComponent;
  let fixture: ComponentFixture<HomeEnFourtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFourtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFourtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
