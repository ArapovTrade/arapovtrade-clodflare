import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirteenComponent } from './home-uk-thirteen.component';

describe('HomeUkThirteenComponent', () => {
  let component: HomeUkThirteenComponent;
  let fixture: ComponentFixture<HomeUkThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
