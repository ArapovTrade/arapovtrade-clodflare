import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourtyThreeComponent } from './home-uk-fourty-three.component';

describe('HomeUkFourtyThreeComponent', () => {
  let component: HomeUkFourtyThreeComponent;
  let fixture: ComponentFixture<HomeUkFourtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
