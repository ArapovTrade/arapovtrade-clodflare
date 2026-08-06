import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourtyComponent } from './home-uk-fourty.component';

describe('HomeUkFourtyComponent', () => {
  let component: HomeUkFourtyComponent;
  let fixture: ComponentFixture<HomeUkFourtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
