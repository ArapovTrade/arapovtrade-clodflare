import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredThirteenComponent } from './home-en-blog-onehundred-thirteen.component';

describe('HomeEnBlogOnehundredThirteenComponent', () => {
  let component: HomeEnBlogOnehundredThirteenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
