import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourComponent } from './home-ru-four.component';

describe('HomeRuComponent', () => {
  let component: HomeRuFourComponent;
  let fixture: ComponentFixture<HomeRuFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRuFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
