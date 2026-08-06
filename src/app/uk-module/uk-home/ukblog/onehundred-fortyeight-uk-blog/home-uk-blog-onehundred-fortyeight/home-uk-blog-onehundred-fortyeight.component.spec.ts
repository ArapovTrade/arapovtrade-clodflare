import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredFortyeightComponent } from './home-uk-blog-onehundred-fortyeight.component';

describe('HomeUkBlogOnehundredFortyeightComponent', () => {
  let component: HomeUkBlogOnehundredFortyeightComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredFortyeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredFortyeightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredFortyeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
