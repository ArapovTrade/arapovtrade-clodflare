import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourtyOneComponent } from './home-uk-fourty-one.component';

describe('HomeUkFourtyOneComponent', () => {
  let component: HomeUkFourtyOneComponent;
  let fixture: ComponentFixture<HomeUkFourtyOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourtyOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourtyOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
