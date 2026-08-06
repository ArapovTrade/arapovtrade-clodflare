import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFourtyOneComponent } from './home-en-fourty-one.component';

describe('HomeEnFourtyOneComponent', () => {
  let component: HomeEnFourtyOneComponent;
  let fixture: ComponentFixture<HomeEnFourtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFourtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFourtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
