import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuNineteenComponent } from './home-ru-nineteen.component';

describe('HomeRuNineteenComponent', () => {
  let component: HomeRuNineteenComponent;
  let fixture: ComponentFixture<HomeRuNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
