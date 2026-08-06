import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventyoneComponent } from './home-ru-blog-onehundred-seventyone.component';

describe('HomeRuBlogOnehundredSeventyoneComponent', () => {
  let component: HomeRuBlogOnehundredSeventyoneComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventyoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventyoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventyoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
