import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentyTwoComponent } from './home-uk-twenty-two.component';

describe('HomeUkTwentyTwoComponent', () => {
  let component: HomeUkTwentyTwoComponent;
  let fixture: ComponentFixture<HomeUkTwentyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
