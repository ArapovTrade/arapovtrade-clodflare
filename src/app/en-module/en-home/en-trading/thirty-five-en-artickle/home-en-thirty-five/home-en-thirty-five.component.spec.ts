import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtyFiveComponent } from './home-en-thirty-five.component';

describe('HomeEnThirtyFiveComponent', () => {
  let component: HomeEnThirtyFiveComponent;
  let fixture: ComponentFixture<HomeEnThirtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
