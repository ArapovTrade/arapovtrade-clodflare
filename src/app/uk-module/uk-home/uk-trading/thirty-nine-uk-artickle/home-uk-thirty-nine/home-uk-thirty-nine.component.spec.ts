import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtyNineComponent } from './home-uk-thirty-nine.component';

describe('HomeUkThirtyNineComponent', () => {
  let component: HomeUkThirtyNineComponent;
  let fixture: ComponentFixture<HomeUkThirtyNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtyNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtyNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
