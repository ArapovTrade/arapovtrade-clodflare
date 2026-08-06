import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtyOneComponent } from './home-ru-thirty-one.component';

describe('HomeRuThirtyOneComponent', () => {
  let component: HomeRuThirtyOneComponent;
  let fixture: ComponentFixture<HomeRuThirtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
