import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnSixComponent } from './home-en-six.component';

describe('HomeEnSixComponent', () => {
  let component: HomeEnSixComponent;
  let fixture: ComponentFixture<HomeEnSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnSixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
