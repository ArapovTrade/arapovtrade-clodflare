import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventyoneComponent } from './home-en-blog-onehundred-seventyone.component';

describe('HomeEnBlogOnehundredSeventyoneComponent', () => {
  let component: HomeEnBlogOnehundredSeventyoneComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
