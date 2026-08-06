import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentyOneComponent } from './home-en-twenty-one.component';

describe('HomeEnTwentyOneComponent', () => {
  let component: HomeEnTwentyOneComponent;
  let fixture: ComponentFixture<HomeEnTwentyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
