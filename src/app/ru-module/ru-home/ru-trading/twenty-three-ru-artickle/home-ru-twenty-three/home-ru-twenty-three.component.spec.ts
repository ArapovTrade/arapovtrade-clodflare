import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentyThreeComponent } from './home-ru-twenty-three.component';

describe('HomeRuTwentyThreeComponent', () => {
  let component: HomeRuTwentyThreeComponent;
  let fixture: ComponentFixture<HomeRuTwentyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
