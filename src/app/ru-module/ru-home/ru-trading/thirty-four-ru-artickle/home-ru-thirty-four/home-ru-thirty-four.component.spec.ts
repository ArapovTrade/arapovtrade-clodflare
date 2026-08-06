import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtyFourComponent } from './home-ru-thirty-four.component';

describe('HomeRuThirtyFourComponent', () => {
  let component: HomeRuThirtyFourComponent;
  let fixture: ComponentFixture<HomeRuThirtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
