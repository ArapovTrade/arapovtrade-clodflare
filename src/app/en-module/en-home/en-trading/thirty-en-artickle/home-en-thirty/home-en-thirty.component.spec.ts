import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtyComponent } from './home-en-thirty.component';

describe('HomeEnThirtyComponent', () => {
  let component: HomeEnThirtyComponent;
  let fixture: ComponentFixture<HomeEnThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
