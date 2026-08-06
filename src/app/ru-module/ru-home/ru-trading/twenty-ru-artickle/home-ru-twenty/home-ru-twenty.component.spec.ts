import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwentyComponent } from './home-ru-twenty.component';

describe('HomeRuTwentyComponent', () => {
  let component: HomeRuTwentyComponent;
  let fixture: ComponentFixture<HomeRuTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
