import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentyFiveComponent } from './home-uk-twenty-five.component';

describe('HomeUkTwentyFiveComponent', () => {
  let component: HomeUkTwentyFiveComponent;
  let fixture: ComponentFixture<HomeUkTwentyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
