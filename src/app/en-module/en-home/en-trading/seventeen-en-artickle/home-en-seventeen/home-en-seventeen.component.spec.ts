import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnSeventeenComponent } from './home-en-seventeen.component';

describe('HomeEnSeventeenComponent', () => {
  let component: HomeEnSeventeenComponent;
  let fixture: ComponentFixture<HomeEnSeventeenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnSeventeenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnSeventeenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
