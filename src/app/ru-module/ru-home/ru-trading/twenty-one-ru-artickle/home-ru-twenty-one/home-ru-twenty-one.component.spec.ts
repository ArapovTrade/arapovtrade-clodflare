import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentyOneComponent } from './home-ru-twenty-one.component';

describe('HomeRuTwentyOneComponent', () => {
  let component: HomeRuTwentyOneComponent;
  let fixture: ComponentFixture<HomeRuTwentyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
