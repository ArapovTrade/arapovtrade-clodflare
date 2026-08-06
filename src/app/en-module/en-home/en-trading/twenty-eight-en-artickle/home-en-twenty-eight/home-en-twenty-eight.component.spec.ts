import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentyEightComponent } from './home-en-twenty-eight.component';

describe('HomeEnTwentyEightComponent', () => {
  let component: HomeEnTwentyEightComponent;
  let fixture: ComponentFixture<HomeEnTwentyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
