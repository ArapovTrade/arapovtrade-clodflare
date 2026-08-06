import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredSeventyfiveComponent } from './home-en-blog-onehundred-seventyfive.component';

describe('HomeEnBlogOnehundredSeventyfiveComponent', () => {
  let component: HomeEnBlogOnehundredSeventyfiveComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredSeventyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredSeventyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredSeventyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
