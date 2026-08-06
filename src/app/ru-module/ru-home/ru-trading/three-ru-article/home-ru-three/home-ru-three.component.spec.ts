import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThreeComponent } from './home-ru-three.component';

describe('HomeRuComponent', () => {
  let component: HomeRuThreeComponent;
  let fixture: ComponentFixture<HomeRuThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThreeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRuThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
