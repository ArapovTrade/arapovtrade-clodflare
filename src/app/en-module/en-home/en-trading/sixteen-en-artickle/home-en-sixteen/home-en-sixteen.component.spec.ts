import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnSixteenComponent } from './home-en-sixteen.component';

describe('HomeEnSixteenComponent', () => {
  let component: HomeEnSixteenComponent;
  let fixture: ComponentFixture<HomeEnSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
