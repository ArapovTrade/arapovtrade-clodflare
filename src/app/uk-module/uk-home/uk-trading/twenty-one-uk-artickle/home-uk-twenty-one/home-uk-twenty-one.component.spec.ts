import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentyOneComponent } from './home-uk-twenty-one.component';

describe('HomeUkTwentyOneComponent', () => {
  let component: HomeUkTwentyOneComponent;
  let fixture: ComponentFixture<HomeUkTwentyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
