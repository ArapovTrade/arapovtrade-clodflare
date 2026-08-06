import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtyOneComponent } from './home-en-thirty-one.component';

describe('HomeEnThirtyOneComponent', () => {
  let component: HomeEnThirtyOneComponent;
  let fixture: ComponentFixture<HomeEnThirtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
