import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkSixteenComponent } from './home-uk-sixteen.component';

describe('HomeUkSixteenComponent', () => {
  let component: HomeUkSixteenComponent;
  let fixture: ComponentFixture<HomeUkSixteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkSixteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkSixteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
