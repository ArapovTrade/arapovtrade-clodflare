import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtyEightComponent } from './home-uk-thirty-eight.component';

describe('HomeUkThirtyEightComponent', () => {
  let component: HomeUkThirtyEightComponent;
  let fixture: ComponentFixture<HomeUkThirtyEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtyEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtyEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
