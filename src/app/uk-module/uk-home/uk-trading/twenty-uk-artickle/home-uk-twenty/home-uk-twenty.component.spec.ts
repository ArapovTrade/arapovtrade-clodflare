import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwentyComponent } from './home-uk-twenty.component';

describe('HomeUkTwentyComponent', () => {
  let component: HomeUkTwentyComponent;
  let fixture: ComponentFixture<HomeUkTwentyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwentyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
