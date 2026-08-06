import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkNineteenComponent } from './home-uk-nineteen.component';

describe('HomeUkNineteenComponent', () => {
  let component: HomeUkNineteenComponent;
  let fixture: ComponentFixture<HomeUkNineteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkNineteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkNineteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
