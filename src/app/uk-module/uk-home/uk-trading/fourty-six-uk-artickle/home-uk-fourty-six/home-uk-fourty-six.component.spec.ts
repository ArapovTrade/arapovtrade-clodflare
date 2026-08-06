import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkFourtySixComponent } from './home-uk-fourty-six.component';

describe('HomeUkFourtySixComponent', () => {
  let component: HomeUkFourtySixComponent;
  let fixture: ComponentFixture<HomeUkFourtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkFourtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkFourtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
