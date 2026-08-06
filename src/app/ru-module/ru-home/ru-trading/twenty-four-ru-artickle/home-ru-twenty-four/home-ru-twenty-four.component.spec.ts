import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentyFourComponent } from './home-ru-twenty-four.component';

describe('HomeRuTwentyFourComponent', () => {
  let component: HomeRuTwentyFourComponent;
  let fixture: ComponentFixture<HomeRuTwentyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
