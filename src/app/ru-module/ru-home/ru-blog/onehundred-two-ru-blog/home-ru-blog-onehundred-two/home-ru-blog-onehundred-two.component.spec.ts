import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredTwoComponent } from './home-ru-blog-onehundred-two.component';

describe('HomeRuBlogOnehundredTwoComponent', () => {
  let component: HomeRuBlogOnehundredTwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
