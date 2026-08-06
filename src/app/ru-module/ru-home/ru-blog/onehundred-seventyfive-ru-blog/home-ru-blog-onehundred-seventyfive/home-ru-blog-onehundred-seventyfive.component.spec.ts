import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredSeventyfiveComponent } from './home-ru-blog-onehundred-seventyfive.component';

describe('HomeRuBlogOnehundredSeventyfiveComponent', () => {
  let component: HomeRuBlogOnehundredSeventyfiveComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredSeventyfiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredSeventyfiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredSeventyfiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
