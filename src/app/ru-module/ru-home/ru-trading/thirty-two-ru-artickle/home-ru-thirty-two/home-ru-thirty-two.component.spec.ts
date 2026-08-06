import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtyTwoComponent } from './home-ru-thirty-two.component';

describe('HomeRuThirtyTwoComponent', () => {
  let component: HomeRuThirtyTwoComponent;
  let fixture: ComponentFixture<HomeRuThirtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
