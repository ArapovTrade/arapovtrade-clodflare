import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirteenComponent } from './home-uk-blog-onehundred-thirteen.component';

describe('HomeUkBlogOnehundredThirteenComponent', () => {
  let component: HomeUkBlogOnehundredThirteenComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirteenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirteenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirteenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
