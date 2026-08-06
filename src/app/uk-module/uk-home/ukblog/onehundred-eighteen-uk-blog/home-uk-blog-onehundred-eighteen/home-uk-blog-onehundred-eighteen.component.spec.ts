import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredEighteenComponent } from './home-uk-blog-onehundred-eighteen.component';

describe('HomeUkBlogOnehundredEighteenComponent', () => {
  let component: HomeUkBlogOnehundredEighteenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredEighteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredEighteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredEighteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
