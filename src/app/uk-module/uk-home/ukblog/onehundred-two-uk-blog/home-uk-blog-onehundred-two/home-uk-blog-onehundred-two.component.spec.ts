import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredTwoComponent } from './home-uk-blog-onehundred-two.component';

describe('HomeUkBlogOnehundredTwoComponent', () => {
  let component: HomeUkBlogOnehundredTwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredTwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
