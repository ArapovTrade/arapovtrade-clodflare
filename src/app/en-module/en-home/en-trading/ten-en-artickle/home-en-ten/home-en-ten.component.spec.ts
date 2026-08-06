import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnTenComponent } from './home-en-ten.component';

describe('HomeEnTenComponent', () => {
  let component: HomeEnTenComponent;
  let fixture: ComponentFixture<HomeEnTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
