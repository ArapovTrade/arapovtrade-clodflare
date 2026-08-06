import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFifteenComponent } from './home-en-fifteen.component';

describe('HomeEnFifteenComponent', () => {
  let component: HomeEnFifteenComponent;
  let fixture: ComponentFixture<HomeEnFifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFifteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
