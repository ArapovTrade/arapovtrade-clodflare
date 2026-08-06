import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnNineComponent } from './home-en-nine.component';

describe('HomeEnNineComponent', () => {
  let component: HomeEnNineComponent;
  let fixture: ComponentFixture<HomeEnNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
