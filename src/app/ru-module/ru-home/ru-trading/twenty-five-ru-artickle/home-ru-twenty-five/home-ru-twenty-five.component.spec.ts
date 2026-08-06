import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentyFiveComponent } from './home-ru-twenty-five.component';

describe('HomeRuTwentyFiveComponent', () => {
  let component: HomeRuTwentyFiveComponent;
  let fixture: ComponentFixture<HomeRuTwentyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
