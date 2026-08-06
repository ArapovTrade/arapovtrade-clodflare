import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThreeComponent } from './home-uk-three.component';

describe('HomeUkThreeComponent', () => {
  let component: HomeUkThreeComponent;
  let fixture: ComponentFixture<HomeUkThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThreeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
