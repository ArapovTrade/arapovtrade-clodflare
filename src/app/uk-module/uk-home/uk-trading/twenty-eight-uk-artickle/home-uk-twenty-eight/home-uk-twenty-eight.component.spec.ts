import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentyEightComponent } from './home-uk-twenty-eight.component';

describe('HomeUkTwentyEightComponent', () => {
  let component: HomeUkTwentyEightComponent;
  let fixture: ComponentFixture<HomeUkTwentyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
