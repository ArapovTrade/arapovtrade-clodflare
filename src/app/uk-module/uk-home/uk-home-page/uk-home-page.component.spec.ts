import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UkHomePageComponent } from './uk-home-page.component';

describe('HomePageComponent', () => {
  let component: UkHomePageComponent;
  let fixture: ComponentFixture<UkHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UkHomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UkHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
