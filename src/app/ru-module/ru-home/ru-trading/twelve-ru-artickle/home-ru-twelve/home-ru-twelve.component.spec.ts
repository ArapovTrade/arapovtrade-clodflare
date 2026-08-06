import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuTwelveComponent } from './home-ru-twelve.component';

describe('HomeRuTwelveComponent', () => {
  let component: HomeRuTwelveComponent;
  let fixture: ComponentFixture<HomeRuTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
