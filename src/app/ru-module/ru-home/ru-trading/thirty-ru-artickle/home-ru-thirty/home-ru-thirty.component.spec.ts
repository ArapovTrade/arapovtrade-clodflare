import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuThirtyComponent } from './home-ru-thirty.component';

describe('HomeRuThirtyComponent', () => {
  let component: HomeRuThirtyComponent;
  let fixture: ComponentFixture<HomeRuThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
