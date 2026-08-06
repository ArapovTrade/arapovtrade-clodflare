import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourteenComponent } from './home-ru-fourteen.component';

describe('HomeRuFourteenComponent', () => {
  let component: HomeRuFourteenComponent;
  let fixture: ComponentFixture<HomeRuFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
