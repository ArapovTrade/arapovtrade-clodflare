import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourtyTwoComponent } from './home-uk-fourty-two.component';

describe('HomeUkFourtyTwoComponent', () => {
  let component: HomeUkFourtyTwoComponent;
  let fixture: ComponentFixture<HomeUkFourtyTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourtyTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourtyTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
