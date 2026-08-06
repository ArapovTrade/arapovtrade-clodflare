import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFiveComponent } from './home-uk-five.component';

describe('HomeUkFiveComponent', () => {
  let component: HomeUkFiveComponent;
  let fixture: ComponentFixture<HomeUkFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
