import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTwelveComponent } from './home-en-twelve.component';

describe('HomeEnTwelveComponent', () => {
  let component: HomeEnTwelveComponent;
  let fixture: ComponentFixture<HomeEnTwelveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTwelveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTwelveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
