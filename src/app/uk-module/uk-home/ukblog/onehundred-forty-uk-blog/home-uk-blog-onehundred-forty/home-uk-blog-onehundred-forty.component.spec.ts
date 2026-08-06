import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortyComponent } from './home-uk-blog-onehundred-forty.component';

describe('HomeUkBlogOnehundredFortyComponent', () => {
  let component: HomeUkBlogOnehundredFortyComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
