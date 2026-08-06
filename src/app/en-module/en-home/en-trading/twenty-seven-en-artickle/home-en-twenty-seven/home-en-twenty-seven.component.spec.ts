import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentySevenComponent } from './home-en-twenty-seven.component';

describe('HomeEnTwentySevenComponent', () => {
  let component: HomeEnTwentySevenComponent;
  let fixture: ComponentFixture<HomeEnTwentySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
