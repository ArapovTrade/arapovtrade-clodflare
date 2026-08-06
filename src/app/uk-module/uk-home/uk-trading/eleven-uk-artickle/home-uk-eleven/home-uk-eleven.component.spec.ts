import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkElevenComponent } from './home-uk-eleven.component';

describe('HomeUkElevenComponent', () => {
  let component: HomeUkElevenComponent;
  let fixture: ComponentFixture<HomeUkElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
