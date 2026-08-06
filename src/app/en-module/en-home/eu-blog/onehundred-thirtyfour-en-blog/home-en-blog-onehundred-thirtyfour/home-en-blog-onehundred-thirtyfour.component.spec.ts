import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirtyfourComponent } from './home-en-blog-onehundred-thirtyfour.component';

describe('HomeEnBlogOnehundredThirtyfourComponent', () => {
  let component: HomeEnBlogOnehundredThirtyfourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirtyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirtyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirtyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
