import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtyNineComponent } from './home-en-thirty-nine.component';

describe('HomeEnThirtyNineComponent', () => {
  let component: HomeEnThirtyNineComponent;
  let fixture: ComponentFixture<HomeEnThirtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
