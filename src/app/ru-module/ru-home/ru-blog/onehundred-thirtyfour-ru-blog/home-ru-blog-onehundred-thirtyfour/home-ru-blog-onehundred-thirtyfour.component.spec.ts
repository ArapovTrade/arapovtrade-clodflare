import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredThirtyfourComponent } from './home-ru-blog-onehundred-thirtyfour.component';

describe('HomeRuBlogOnehundredThirtyfourComponent', () => {
  let component: HomeRuBlogOnehundredThirtyfourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredThirtyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredThirtyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredThirtyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
