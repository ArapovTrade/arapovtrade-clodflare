import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFifteenComponent } from './home-uk-fifteen.component';

describe('HomeUkFifteenComponent', () => {
  let component: HomeUkFifteenComponent;
  let fixture: ComponentFixture<HomeUkFifteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFifteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFifteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
