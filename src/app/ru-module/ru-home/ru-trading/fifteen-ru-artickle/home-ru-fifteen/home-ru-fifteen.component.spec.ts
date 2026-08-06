import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFifteenComponent } from './home-ru-fifteen.component';

describe('HomeRuFifteenComponent', () => {
  let component: HomeRuFifteenComponent;
  let fixture: ComponentFixture<HomeRuFifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFifteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
