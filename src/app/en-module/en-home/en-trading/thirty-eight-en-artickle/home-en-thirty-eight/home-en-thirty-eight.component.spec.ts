import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtyEightComponent } from './home-en-thirty-eight.component';

describe('HomeEnThirtyEightComponent', () => {
  let component: HomeEnThirtyEightComponent;
  let fixture: ComponentFixture<HomeEnThirtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
