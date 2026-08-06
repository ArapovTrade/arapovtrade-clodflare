import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEightytwoComponent } from './home-en-blog-onehundred-eightytwo.component';

describe('HomeEnBlogOnehundredEightytwoComponent', () => {
  let component: HomeEnBlogOnehundredEightytwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEightytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEightytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEightytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
