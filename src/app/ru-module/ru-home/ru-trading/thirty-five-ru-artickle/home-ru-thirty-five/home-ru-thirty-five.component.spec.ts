import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtyFiveComponent } from './home-ru-thirty-five.component';

describe('HomeRuThirtyFiveComponent', () => {
  let component: HomeRuThirtyFiveComponent;
  let fixture: ComponentFixture<HomeRuThirtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
