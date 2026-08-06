import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEightytwoComponent } from './home-uk-blog-onehundred-eightytwo.component';

describe('HomeUkBlogOnehundredEightytwoComponent', () => {
  let component: HomeUkBlogOnehundredEightytwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEightytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEightytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEightytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
