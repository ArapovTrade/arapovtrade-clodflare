import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnFourtySixComponent } from './home-en-fourty-six.component';

describe('HomeEnFourtySixComponent', () => {
  let component: HomeEnFourtySixComponent;
  let fixture: ComponentFixture<HomeEnFourtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnFourtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnFourtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
