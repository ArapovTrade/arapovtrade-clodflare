import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredNineComponent } from './home-uk-blog-onehundred-nine.component';

describe('HomeUkBlogOnehundredNineComponent', () => {
  let component: HomeUkBlogOnehundredNineComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
