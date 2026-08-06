import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTenComponent } from './home-ru-ten.component';

describe('HomeRuTenComponent', () => {
  let component: HomeRuTenComponent;
  let fixture: ComponentFixture<HomeRuTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
