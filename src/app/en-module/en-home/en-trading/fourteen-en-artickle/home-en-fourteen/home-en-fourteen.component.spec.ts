import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFourteenComponent } from './home-en-fourteen.component';

describe('HomeEnFourteenComponent', () => {
  let component: HomeEnFourteenComponent;
  let fixture: ComponentFixture<HomeEnFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
