import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirtyFourComponent } from './home-en-thirty-four.component';

describe('HomeEnThirtyFourComponent', () => {
  let component: HomeEnThirtyFourComponent;
  let fixture: ComponentFixture<HomeEnThirtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
