import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredTwoComponent } from './home-en-blog-onehundred-two.component';

describe('HomeEnBlogOnehundredTwoComponent', () => {
  let component: HomeEnBlogOnehundredTwoComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
