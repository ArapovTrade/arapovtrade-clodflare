import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuSeventeenComponent } from './home-ru-seventeen.component';

describe('HomeRuSeventeenComponent', () => {
  let component: HomeRuSeventeenComponent;
  let fixture: ComponentFixture<HomeRuSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
