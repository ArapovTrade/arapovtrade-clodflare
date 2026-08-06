import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuOneComponent } from './home-ru-one.component';

describe('HomeRuComponent', () => {
  let component: HomeRuOneComponent;
  let fixture: ComponentFixture<HomeRuOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuOneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRuOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
