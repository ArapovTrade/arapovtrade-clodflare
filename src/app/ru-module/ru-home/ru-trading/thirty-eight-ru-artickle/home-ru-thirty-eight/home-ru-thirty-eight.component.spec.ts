import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtyEightComponent } from './home-ru-thirty-eight.component';

describe('HomeRuThirtyEightComponent', () => {
  let component: HomeRuThirtyEightComponent;
  let fixture: ComponentFixture<HomeRuThirtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
