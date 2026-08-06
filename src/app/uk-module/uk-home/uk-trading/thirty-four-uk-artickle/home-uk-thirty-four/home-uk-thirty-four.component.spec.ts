import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtyFourComponent } from './home-uk-thirty-four.component';

describe('HomeUkThirtyFourComponent', () => {
  let component: HomeUkThirtyFourComponent;
  let fixture: ComponentFixture<HomeUkThirtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
