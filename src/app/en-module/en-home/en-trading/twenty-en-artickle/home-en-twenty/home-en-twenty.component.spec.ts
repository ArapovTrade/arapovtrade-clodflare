import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwentyComponent } from './home-en-twenty.component';

describe('HomeEnTwentyComponent', () => {
  let component: HomeEnTwentyComponent;
  let fixture: ComponentFixture<HomeEnTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
