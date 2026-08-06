import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkEighteenComponent } from './home-uk-eighteen.component';

describe('HomeUkEighteenComponent', () => {
  let component: HomeUkEighteenComponent;
  let fixture: ComponentFixture<HomeUkEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
