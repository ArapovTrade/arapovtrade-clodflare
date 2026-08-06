import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtyThreeComponent } from './home-en-thirty-three.component';

describe('HomeEnThirtyThreeComponent', () => {
  let component: HomeEnThirtyThreeComponent;
  let fixture: ComponentFixture<HomeEnThirtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
