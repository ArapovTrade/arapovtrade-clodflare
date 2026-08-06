import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEnBlogOnehundredEighteenComponent } from './home-en-blog-onehundred-eighteen.component';

describe('HomeEnBlogOnehundredEighteenComponent', () => {
  let component: HomeEnBlogOnehundredEighteenComponent;
  let fixture: ComponentFixture<HomeEnBlogOnehundredEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeEnBlogOnehundredEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEnBlogOnehundredEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
