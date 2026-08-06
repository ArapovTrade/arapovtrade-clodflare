import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuSevenComponent } from './home-ru-seven.component';

describe('HomeRuSevenComponent', () => {
  let component: HomeRuSevenComponent;
  let fixture: ComponentFixture<HomeRuSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
