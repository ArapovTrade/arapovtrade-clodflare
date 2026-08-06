import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuElevenComponent } from './home-ru-eleven.component';

describe('HomeRuElevenComponent', () => {
  let component: HomeRuElevenComponent;
  let fixture: ComponentFixture<HomeRuElevenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuElevenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuElevenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
