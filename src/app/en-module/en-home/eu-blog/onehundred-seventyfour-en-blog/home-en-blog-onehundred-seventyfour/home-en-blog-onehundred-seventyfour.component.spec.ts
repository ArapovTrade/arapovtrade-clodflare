import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventyfourComponent } from './home-en-blog-onehundred-seventyfour.component';

describe('HomeEnBlogOnehundredSeventyfourComponent', () => {
  let component: HomeEnBlogOnehundredSeventyfourComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
