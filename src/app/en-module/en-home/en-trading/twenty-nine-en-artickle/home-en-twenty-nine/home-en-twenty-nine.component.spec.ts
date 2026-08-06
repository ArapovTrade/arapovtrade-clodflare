import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentyNineComponent } from './home-en-twenty-nine.component';

describe('HomeEnTwentyNineComponent', () => {
  let component: HomeEnTwentyNineComponent;
  let fixture: ComponentFixture<HomeEnTwentyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
