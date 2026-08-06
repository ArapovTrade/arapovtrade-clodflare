import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFourtyComponent } from './home-en-fourty.component';

describe('HomeEnFourtyComponent', () => {
  let component: HomeEnFourtyComponent;
  let fixture: ComponentFixture<HomeEnFourtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFourtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFourtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
