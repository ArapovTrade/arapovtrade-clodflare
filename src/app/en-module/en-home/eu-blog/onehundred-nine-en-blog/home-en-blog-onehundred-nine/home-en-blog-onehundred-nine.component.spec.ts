import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredNineComponent } from './home-en-blog-onehundred-nine.component';

describe('HomeEnBlogOnehundredNineComponent', () => {
  let component: HomeEnBlogOnehundredNineComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredNineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredNineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredNineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
