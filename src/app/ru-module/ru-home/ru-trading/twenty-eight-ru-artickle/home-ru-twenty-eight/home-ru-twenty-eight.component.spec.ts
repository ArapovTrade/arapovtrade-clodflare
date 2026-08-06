import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentyEightComponent } from './home-ru-twenty-eight.component';

describe('HomeRuTwentyEightComponent', () => {
  let component: HomeRuTwentyEightComponent;
  let fixture: ComponentFixture<HomeRuTwentyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
