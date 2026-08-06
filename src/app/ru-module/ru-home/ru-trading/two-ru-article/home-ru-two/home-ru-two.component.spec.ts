import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwoComponent } from './home-ru-two.component';

describe('HomeRuComponent', () => {
  let component: HomeRuTwoComponent;
  let fixture: ComponentFixture<HomeRuTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRuTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
