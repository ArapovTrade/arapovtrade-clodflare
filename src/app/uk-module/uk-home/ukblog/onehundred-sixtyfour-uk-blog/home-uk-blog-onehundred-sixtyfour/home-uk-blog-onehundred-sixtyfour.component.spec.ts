import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUkBlogOnehundredSixtyfourComponent } from './home-uk-blog-onehundred-sixtyfour.component';

describe('HomeUkBlogOnehundredSixtyfourComponent', () => {
  let component: HomeUkBlogOnehundredSixtyfourComponent;
  let fixture: ComponentFixture<HomeUkBlogOnehundredSixtyfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUkBlogOnehundredSixtyfourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUkBlogOnehundredSixtyfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
