import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirteenComponent } from './home-ru-thirteen.component';

describe('HomeRuThirteenComponent', () => {
  let component: HomeRuThirteenComponent;
  let fixture: ComponentFixture<HomeRuThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
