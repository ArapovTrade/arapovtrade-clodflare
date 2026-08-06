import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkSevenComponent } from './home-uk-seven.component';

describe('HomeUkSevenComponent', () => {
  let component: HomeUkSevenComponent;
  let fixture: ComponentFixture<HomeUkSevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkSevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkSevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
