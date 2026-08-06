import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuSixteenComponent } from './home-ru-sixteen.component';

describe('HomeRuSixteenComponent', () => {
  let component: HomeRuSixteenComponent;
  let fixture: ComponentFixture<HomeRuSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
