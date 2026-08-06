import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentyFourComponent } from './home-en-twenty-four.component';

describe('HomeEnTwentyFourComponent', () => {
  let component: HomeEnTwentyFourComponent;
  let fixture: ComponentFixture<HomeEnTwentyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
