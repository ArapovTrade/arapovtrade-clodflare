import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRuBlogOnehundredEightytwoComponent } from './home-ru-blog-onehundred-eightytwo.component';

describe('HomeRuBlogOnehundredEightytwoComponent', () => {
  let component: HomeRuBlogOnehundredEightytwoComponent;
  let fixture: ComponentFixture<HomeRuBlogOnehundredEightytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeRuBlogOnehundredEightytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeRuBlogOnehundredEightytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
