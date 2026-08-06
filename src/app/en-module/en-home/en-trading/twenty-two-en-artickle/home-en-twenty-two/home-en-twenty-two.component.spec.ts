import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentyTwoComponent } from './home-en-twenty-two.component';

describe('HomeEnTwentyTwoComponent', () => {
  let component: HomeEnTwentyTwoComponent;
  let fixture: ComponentFixture<HomeEnTwentyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
