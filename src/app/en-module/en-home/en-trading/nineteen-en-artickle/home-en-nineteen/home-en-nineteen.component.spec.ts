import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnNineteenComponent } from './home-en-nineteen.component';

describe('HomeEnNineteenComponent', () => {
  let component: HomeEnNineteenComponent;
  let fixture: ComponentFixture<HomeEnNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
