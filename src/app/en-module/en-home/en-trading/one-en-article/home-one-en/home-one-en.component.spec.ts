import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeOneEnComponent } from './home-one-en.component';

describe('HomeOneEnComponent', () => {
  let component: HomeOneEnComponent;
  let fixture: ComponentFixture<HomeOneEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeOneEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeOneEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
