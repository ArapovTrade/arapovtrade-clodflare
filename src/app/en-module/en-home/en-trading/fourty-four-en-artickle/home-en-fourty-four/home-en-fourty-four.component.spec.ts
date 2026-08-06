import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFourtyFourComponent } from './home-en-fourty-four.component';

describe('HomeEnFourtyFourComponent', () => {
  let component: HomeEnFourtyFourComponent;
  let fixture: ComponentFixture<HomeEnFourtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFourtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFourtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
