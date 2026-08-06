import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentyFiveComponent } from './home-en-twenty-five.component';

describe('HomeEnTwentyFiveComponent', () => {
  let component: HomeEnTwentyFiveComponent;
  let fixture: ComponentFixture<HomeEnTwentyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
