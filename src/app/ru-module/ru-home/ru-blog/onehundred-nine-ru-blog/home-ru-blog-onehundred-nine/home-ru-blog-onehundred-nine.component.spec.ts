import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredNineComponent } from './home-ru-blog-onehundred-nine.component';

describe('HomeRuBlogOnehundredNineComponent', () => {
  let component: HomeRuBlogOnehundredNineComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
