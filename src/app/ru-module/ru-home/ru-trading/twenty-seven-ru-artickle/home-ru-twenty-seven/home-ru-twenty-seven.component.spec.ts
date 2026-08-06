import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentySevenComponent } from './home-ru-twenty-seven.component';

describe('HomeRuTwentySevenComponent', () => {
  let component: HomeRuTwentySevenComponent;
  let fixture: ComponentFixture<HomeRuTwentySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
