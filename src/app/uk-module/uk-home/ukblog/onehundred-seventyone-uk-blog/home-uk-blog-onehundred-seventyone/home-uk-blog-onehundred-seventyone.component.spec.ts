import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventyoneComponent } from './home-uk-blog-onehundred-seventyone.component';

describe('HomeUkBlogOnehundredSeventyoneComponent', () => {
  let component: HomeUkBlogOnehundredSeventyoneComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
