import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnElevenComponent } from './home-en-eleven.component';

describe('HomeEnElevenComponent', () => {
  let component: HomeEnElevenComponent;
  let fixture: ComponentFixture<HomeEnElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
