import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnEighteenComponent } from './home-en-eighteen.component';

describe('HomeEnEighteenComponent', () => {
  let component: HomeEnEighteenComponent;
  let fixture: ComponentFixture<HomeEnEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
