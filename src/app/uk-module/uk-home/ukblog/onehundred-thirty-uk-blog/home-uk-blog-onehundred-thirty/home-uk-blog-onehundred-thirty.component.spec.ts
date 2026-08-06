import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredThirtyComponent } from './home-uk-blog-onehundred-thirty.component';

describe('HomeUkBlogOnehundredThirtyComponent', () => {
  let component: HomeUkBlogOnehundredThirtyComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredThirtyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredThirtyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredThirtyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
