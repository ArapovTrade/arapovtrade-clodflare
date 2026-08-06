import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtyfiveComponent } from './home-uk-blog-onehundred-thirtyfive.component';

describe('HomeUkBlogOnehundredThirtyfiveComponent', () => {
  let component: HomeUkBlogOnehundredThirtyfiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
