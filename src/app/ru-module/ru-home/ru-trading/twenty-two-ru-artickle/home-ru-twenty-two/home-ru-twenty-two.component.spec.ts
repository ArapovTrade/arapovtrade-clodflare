import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentyTwoComponent } from './home-ru-twenty-two.component';

describe('HomeRuTwentyTwoComponent', () => {
  let component: HomeRuTwentyTwoComponent;
  let fixture: ComponentFixture<HomeRuTwentyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
