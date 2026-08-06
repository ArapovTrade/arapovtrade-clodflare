import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtyfourComponent } from './home-uk-blog-onehundred-thirtyfour.component';

describe('HomeUkBlogOnehundredThirtyfourComponent', () => {
  let component: HomeUkBlogOnehundredThirtyfourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
