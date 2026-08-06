import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtySevenComponent } from './home-uk-thirty-seven.component';

describe('HomeUkThirtySevenComponent', () => {
  let component: HomeUkThirtySevenComponent;
  let fixture: ComponentFixture<HomeUkThirtySevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtySevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtySevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
