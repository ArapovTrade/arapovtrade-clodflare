import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwelveComponent } from './home-uk-twelve.component';

describe('HomeUkTwelveComponent', () => {
  let component: HomeUkTwelveComponent;
  let fixture: ComponentFixture<HomeUkTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
