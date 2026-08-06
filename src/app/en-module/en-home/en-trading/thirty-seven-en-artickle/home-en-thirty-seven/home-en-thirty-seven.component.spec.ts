import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtySevenComponent } from './home-en-thirty-seven.component';

describe('HomeEnThirtySevenComponent', () => {
  let component: HomeEnThirtySevenComponent;
  let fixture: ComponentFixture<HomeEnThirtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
