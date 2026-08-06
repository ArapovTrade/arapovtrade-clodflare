import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentySevenComponent } from './home-uk-twenty-seven.component';

describe('HomeUkTwentySevenComponent', () => {
  let component: HomeUkTwentySevenComponent;
  let fixture: ComponentFixture<HomeUkTwentySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
