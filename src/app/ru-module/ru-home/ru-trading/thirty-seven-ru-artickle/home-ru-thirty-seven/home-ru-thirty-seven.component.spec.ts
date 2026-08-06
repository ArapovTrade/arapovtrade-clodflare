import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtySevenComponent } from './home-ru-thirty-seven.component';

describe('HomeRuThirtySevenComponent', () => {
  let component: HomeRuThirtySevenComponent;
  let fixture: ComponentFixture<HomeRuThirtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
