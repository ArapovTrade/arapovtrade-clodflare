import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventyfourComponent } from './home-uk-blog-onehundred-seventyfour.component';

describe('HomeUkBlogOnehundredSeventyfourComponent', () => {
  let component: HomeUkBlogOnehundredSeventyfourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
