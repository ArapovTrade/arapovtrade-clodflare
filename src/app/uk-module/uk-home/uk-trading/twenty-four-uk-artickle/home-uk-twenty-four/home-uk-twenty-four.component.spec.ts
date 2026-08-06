import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentyFourComponent } from './home-uk-twenty-four.component';

describe('HomeUkTwentyFourComponent', () => {
  let component: HomeUkTwentyFourComponent;
  let fixture: ComponentFixture<HomeUkTwentyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
