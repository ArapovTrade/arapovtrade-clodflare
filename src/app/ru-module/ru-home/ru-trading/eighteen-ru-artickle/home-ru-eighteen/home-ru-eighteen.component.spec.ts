import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuEighteenComponent } from './home-ru-eighteen.component';

describe('HomeRuEighteenComponent', () => {
  let component: HomeRuEighteenComponent;
  let fixture: ComponentFixture<HomeRuEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
