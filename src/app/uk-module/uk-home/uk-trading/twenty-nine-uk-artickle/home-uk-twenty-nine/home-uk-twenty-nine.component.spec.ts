import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentyNineComponent } from './home-uk-twenty-nine.component';

describe('HomeUkTwentyNineComponent', () => {
  let component: HomeUkTwentyNineComponent;
  let fixture: ComponentFixture<HomeUkTwentyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
