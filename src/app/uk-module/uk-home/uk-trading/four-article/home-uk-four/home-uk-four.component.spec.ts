import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourComponent } from './home-uk-four.component';

describe('HomeUkFourComponent', () => {
  let component: HomeUkFourComponent;
  let fixture: ComponentFixture<HomeUkFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
