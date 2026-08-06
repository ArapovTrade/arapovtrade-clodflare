import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtyComponent } from './home-uk-thirty.component';

describe('HomeUkThirtyComponent', () => {
  let component: HomeUkThirtyComponent;
  let fixture: ComponentFixture<HomeUkThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
