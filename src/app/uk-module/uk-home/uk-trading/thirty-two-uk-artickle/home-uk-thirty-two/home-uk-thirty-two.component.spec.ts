import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtyTwoComponent } from './home-uk-thirty-two.component';

describe('HomeUkThirtyTwoComponent', () => {
  let component: HomeUkThirtyTwoComponent;
  let fixture: ComponentFixture<HomeUkThirtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
