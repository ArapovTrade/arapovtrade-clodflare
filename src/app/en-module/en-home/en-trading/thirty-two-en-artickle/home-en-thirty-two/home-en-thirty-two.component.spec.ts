import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtyTwoComponent } from './home-en-thirty-two.component';

describe('HomeEnThirtyTwoComponent', () => {
  let component: HomeEnThirtyTwoComponent;
  let fixture: ComponentFixture<HomeEnThirtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
