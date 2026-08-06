import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkThirtySixComponent } from './home-uk-thirty-six.component';

describe('HomeUkThirtySixComponent', () => {
  let component: HomeUkThirtySixComponent;
  let fixture: ComponentFixture<HomeUkThirtySixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkThirtySixComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkThirtySixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
