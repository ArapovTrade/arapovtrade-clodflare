import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourtyFourComponent } from './home-uk-fourty-four.component';

describe('HomeUkFourtyFourComponent', () => {
  let component: HomeUkFourtyFourComponent;
  let fixture: ComponentFixture<HomeUkFourtyFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourtyFourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourtyFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
