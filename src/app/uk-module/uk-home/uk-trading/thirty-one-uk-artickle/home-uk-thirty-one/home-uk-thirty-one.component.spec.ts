import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtyOneComponent } from './home-uk-thirty-one.component';

describe('HomeUkThirtyOneComponent', () => {
  let component: HomeUkThirtyOneComponent;
  let fixture: ComponentFixture<HomeUkThirtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
