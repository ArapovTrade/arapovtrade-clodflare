import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtyFiveComponent } from './home-uk-thirty-five.component';

describe('HomeUkThirtyFiveComponent', () => {
  let component: HomeUkThirtyFiveComponent;
  let fixture: ComponentFixture<HomeUkThirtyFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtyFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtyFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
