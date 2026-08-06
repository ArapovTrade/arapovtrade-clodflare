import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtyThreeComponent } from './home-uk-thirty-three.component';

describe('HomeUkThirtyThreeComponent', () => {
  let component: HomeUkThirtyThreeComponent;
  let fixture: ComponentFixture<HomeUkThirtyThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtyThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtyThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
