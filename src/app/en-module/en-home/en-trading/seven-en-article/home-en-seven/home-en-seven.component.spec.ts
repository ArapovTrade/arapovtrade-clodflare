import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnSevenComponent } from './home-en-seven.component';

describe('HomeEnSevenComponent', () => {
  let component: HomeEnSevenComponent;
  let fixture: ComponentFixture<HomeEnSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
