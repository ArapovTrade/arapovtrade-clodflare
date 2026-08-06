import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkEightComponent } from './home-uk-eight.component';

describe('HomeUkEightComponent', () => {
  let component: HomeUkEightComponent;
  let fixture: ComponentFixture<HomeUkEightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkEightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkEightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
