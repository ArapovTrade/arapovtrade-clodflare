import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventyfourComponent } from './home-ru-blog-onehundred-seventyfour.component';

describe('HomeRuBlogOnehundredSeventyfourComponent', () => {
  let component: HomeRuBlogOnehundredSeventyfourComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
