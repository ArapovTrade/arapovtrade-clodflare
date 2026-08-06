import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSeventyfiveComponent } from './home-uk-blog-onehundred-seventyfive.component';

describe('HomeUkBlogOnehundredSeventyfiveComponent', () => {
  let component: HomeUkBlogOnehundredSeventyfiveComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSeventyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSeventyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSeventyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
