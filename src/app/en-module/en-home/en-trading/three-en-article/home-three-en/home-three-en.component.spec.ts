import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeThreeEnComponent } from './home-three-en.component';

describe('HomeThreeEnComponent', () => {
  let component: HomeThreeEnComponent;
  let fixture: ComponentFixture<HomeThreeEnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeThreeEnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeThreeEnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
