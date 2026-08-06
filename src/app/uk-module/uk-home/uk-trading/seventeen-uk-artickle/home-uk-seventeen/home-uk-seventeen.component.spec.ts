import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkSeventeenComponent } from './home-uk-seventeen.component';

describe('HomeUkSeventeenComponent', () => {
  let component: HomeUkSeventeenComponent;
  let fixture: ComponentFixture<HomeUkSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
