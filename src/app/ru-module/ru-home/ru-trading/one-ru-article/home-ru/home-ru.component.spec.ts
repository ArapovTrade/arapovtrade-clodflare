import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuComponent } from './home-ru.component';

describe('HomeRuComponent', () => {
  let component: HomeRuComponent;
  let fixture: ComponentFixture<HomeRuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
