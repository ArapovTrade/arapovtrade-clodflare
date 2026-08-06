import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtyNineComponent } from './home-ru-thirty-nine.component';

describe('HomeRuThirtyNineComponent', () => {
  let component: HomeRuThirtyNineComponent;
  let fixture: ComponentFixture<HomeRuThirtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
