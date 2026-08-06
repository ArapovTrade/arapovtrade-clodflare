import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentyThreeComponent } from './home-en-twenty-three.component';

describe('HomeEnTwentyThreeComponent', () => {
  let component: HomeEnTwentyThreeComponent;
  let fixture: ComponentFixture<HomeEnTwentyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
