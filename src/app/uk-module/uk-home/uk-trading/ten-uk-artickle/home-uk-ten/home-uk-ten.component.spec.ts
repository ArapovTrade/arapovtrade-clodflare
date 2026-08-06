import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTenComponent } from './home-uk-ten.component';

describe('HomeUkTenComponent', () => {
  let component: HomeUkTenComponent;
  let fixture: ComponentFixture<HomeUkTenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
