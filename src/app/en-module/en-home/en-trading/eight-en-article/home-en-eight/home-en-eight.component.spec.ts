import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnEightComponent } from './home-en-eight.component';

describe('HomeEnEightComponent', () => {
  let component: HomeEnEightComponent;
  let fixture: ComponentFixture<HomeEnEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
