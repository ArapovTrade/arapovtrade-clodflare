import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuEightComponent } from './home-ru-eight.component';

describe('HomeRuEightComponent', () => {
  let component: HomeRuEightComponent;
  let fixture: ComponentFixture<HomeRuEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
