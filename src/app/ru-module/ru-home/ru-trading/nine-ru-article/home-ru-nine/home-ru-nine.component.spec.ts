import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuNineComponent } from './home-ru-nine.component';

describe('HomeRuNineComponent', () => {
  let component: HomeRuNineComponent;
  let fixture: ComponentFixture<HomeRuNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
