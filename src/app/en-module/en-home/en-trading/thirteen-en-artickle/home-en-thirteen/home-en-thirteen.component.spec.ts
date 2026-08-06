import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnThirteenComponent } from './home-en-thirteen.component';

describe('HomeEnThirteenComponent', () => {
  let component: HomeEnThirteenComponent;
  let fixture: ComponentFixture<HomeEnThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
