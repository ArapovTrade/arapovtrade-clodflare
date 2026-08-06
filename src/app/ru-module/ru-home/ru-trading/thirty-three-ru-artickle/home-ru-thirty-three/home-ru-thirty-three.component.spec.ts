import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtyThreeComponent } from './home-ru-thirty-three.component';

describe('HomeRuThirtyThreeComponent', () => {
  let component: HomeRuThirtyThreeComponent;
  let fixture: ComponentFixture<HomeRuThirtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
