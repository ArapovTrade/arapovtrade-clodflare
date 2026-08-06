import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentyNineComponent } from './home-ru-twenty-nine.component';

describe('HomeRuTwentyNineComponent', () => {
  let component: HomeRuTwentyNineComponent;
  let fixture: ComponentFixture<HomeRuTwentyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
