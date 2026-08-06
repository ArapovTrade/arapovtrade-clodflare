import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkNineComponent } from './home-uk-nine.component';

describe('HomeUkNineComponent', () => {
  let component: HomeUkNineComponent;
  let fixture: ComponentFixture<HomeUkNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
