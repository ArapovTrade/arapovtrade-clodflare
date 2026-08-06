import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourteenComponent } from './home-uk-fourteen.component';

describe('HomeUkFourteenComponent', () => {
  let component: HomeUkFourteenComponent;
  let fixture: ComponentFixture<HomeUkFourteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
