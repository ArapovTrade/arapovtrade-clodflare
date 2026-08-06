import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentyThreeComponent } from './home-uk-twenty-three.component';

describe('HomeUkTwentyThreeComponent', () => {
  let component: HomeUkTwentyThreeComponent;
  let fixture: ComponentFixture<HomeUkTwentyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
