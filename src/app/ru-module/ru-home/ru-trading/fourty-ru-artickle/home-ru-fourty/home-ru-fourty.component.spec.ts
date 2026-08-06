import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuFourtyComponent } from './home-ru-fourty.component';

describe('HomeRuFourtyComponent', () => {
  let component: HomeRuFourtyComponent;
  let fixture: ComponentFixture<HomeRuFourtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuFourtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuFourtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
