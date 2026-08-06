import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkTwoComponent } from './home-uk-two.component';

describe('HomeUkTwoComponent', () => {
  let component: HomeUkTwoComponent;
  let fixture: ComponentFixture<HomeUkTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
