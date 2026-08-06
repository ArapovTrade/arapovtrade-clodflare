import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtytwoComponent } from './home-uk-blog-onehundred-sixtytwo.component';

describe('HomeUkBlogOnehundredSixtytwoComponent', () => {
  let component: HomeUkBlogOnehundredSixtytwoComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtytwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtytwoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtytwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
